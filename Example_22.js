var cursor = 0;
var moveList = [], scoreList =[];
var game =  new Chess(), // Move validation, etc.
            statusEl = $('#status'),
            fenEl = $('#fen'),
            pgnEl = $('#pgn');

function adjustBoardWidth() {
    var fudge = 5;
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var desiredBoardWidth = windowWidth - $('#side').outerWidth(true) - fudge;
    var desiredBoardHeight = windowHeight - $('#header').outerHeight(true) - $('#banner').outerHeight(true) - $('#footer').outerHeight(true) - fudge;

    var boardDiv = $('#board');
    // Using chessboard3.js.
    // Adjust for 4:3 aspect ratio
    desiredBoardWidth &= 0xFFFC; // Mod 4 = 0
    desiredBoardHeight -= (desiredBoardHeight % 3); // Mod 3 = 0

    if (desiredBoardWidth * 0.75 > desiredBoardHeight) { desiredBoardWidth = desiredBoardHeight * 4 / 3; }

    boardDiv.css('width', desiredBoardWidth);
    boardDiv.css('height', (desiredBoardWidth * 0.75));

    if (board !== undefined) { board.resize; }
}

function updateStatus() {
    var status = '';
    var moveColor = 'White';

    if (game.turn() === 'b') { moveColor = 'Black'; }

    if (game.game_over()) {
        if (game.in_checkmate()) { status = moveColor + ' checkmated.'; } 
        else if (game.in_stalemate()) { status = moveColor + " stalemated"; } 
        else if (game.insufficient_material()) { status = "Draw (insufficient material)." } 
        else if (game.in_threefold_repetition()) { status = "Draw (threefold repetition)."} 
        else if (game.in_draw()) { status = "Game over (fifty move rule)." }

        swal({  title : "Game Over",
                text : status,
                type: 'info',
                showCancelButton: false,
                confirmButtonColor: "#DD6655",
                onConfirmButtonText: 'OK',
                closeOnConfirm: true});
    }

    // Game still on
    else {
        status += moveColor + ' to move.';

        // Check?
        if (game.in_check() === true) { status += ' ' + moveColor + ' is in check.'; }
    }

    fenEl.html(game.fen().replace(/ /g, '&nbsp;'));
    var currentPGN = game.pgn({max_width:10,newline_char:"<br>"});

    entirePGN = currentPGN;
    pgnEl.html(currentPGN);
    statusEl.html(status);
};

// Set up chessboard
var onDrop = function(source, target) {
    if (board.hasOwnProperty('removeGreySquares') && typeof board.removeGreySquares === 'function') { board.removeGreySquares(); }

    // See if the move is legal
    var move = game.move({  from: source,
                            to: target,
                            promotion: $("#promotion").val()});

    // Illegal move
    if (move === null){ return 'snapback';}

    moveList = moveList.slice(0, cursor);
    scoreList = scoreList.slice(0, cursor);
    moveList.push(move);
    // User just made a move- add a dummy score for now. We will correct this element once we hear from the engine
    scoreList.push(scoreList.length === 0 ? 0 : scoreList[scoreList.length - 1]);
    cursor = moveList.length;

    if (cursor === 0) {
        cursor++;
        board.position(game.fen(), true);
        updateStatus();
    }

};

var onMouseoverSquare = function(square) {
    // Get list of possible moves for this square
    var moves = game.moves({square: square,
                            verbose: true});

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    if (board.hasOwnProperty('greySquare') && typeof board.greySquare === 'function') {
        // Highlight the square they moused over
        board.greySquare(square);

        // Highlight the possible squares for this piece
        for (var i = 0; i < moves.length; i++) { board.greySquare(moves[i].to); }
    }
};

var onMouseoutSquare = function(square, piece) {
    if (board.hasOwnProperty('removeGreySquares') && typeof board.removeGreySquares === 'function') { board.removeGreySquares(); }
};

var onSnapEnd = function() { };

function createBoard(pieceSet) {
    var cfg = { ameraControls: true,
                draggable: true,
                position: 'start',
                onDrop: onDrop,
                onMouseoutSquare: onMouseoutSquare,
                onMouseoverSquare: onMouseoverSquare,
                onSnapEnd: onSnapEnd,
                fontData: './chessboard3js/assets/fonts/helvetiker_regular.typeface.json',
                pieceSet: './chessboard3js/assets/chesspieces/classic/{piece}.json',
                localStorage: false};

    if (pieceSet) {
        if (pieceSet === 'minions') {
            cfg.whitePieceColor = 0xFFFF00;
            cfg.blackPieceColor = 0xCC00CC;
            cfg.lightSquareColor = 0x888888;
            cfg.darkSquareColor = 0x666666;
        }

        cfg.pieceSet = './chessboard3js/chesspieces/' + pieceSet + '/{piece}.json';
    }
    return new ChessBoard3('board', cfg);

}

adjustBoardWidth();
board = createBoard();

$(window).resize(function() {
    adjustBoardWidth();
});

$('#flipBtn').on('click', function() {
    if (game.game_over()) return;
    
    board.flip(); //wheeee!
});

updateStatus();