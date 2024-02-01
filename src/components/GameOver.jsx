export default function GameOver({winner,onRestart}){
    return <div id="game-over">
        <h2>Gmae Over!</h2>
        {winner && <p>You Won {winner}</p>}
        {!winner && <p>I'ts draw</p>}
        <p>
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
}