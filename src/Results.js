import React from 'react';


class Results extends React.Component {
  render() {
    const {results} = this.props; // p1Wins, p2Wins, ties}
    const played = results.p1Wins + results.p2Wins + results.ties;

    return (
      <div className="game-results">
        <h4>Game Results</h4>
        <hr />
        <div className="result-block">Games Played: {played}<br /></div>
        <div className="result-block">
          <div className="result-block">
            P1 Wins<br />{results.p1Wins}<br />
          </div>
          <div className="result-block">
            P1 Win%<br />{(results.p1Wins / played) * 100}<br />
          </div>
        </div>
        <div className="result-block">
          <div className="result-block">
            P2 Wins<br />{results.p2Wins}<br />
          </div>
          <div className="result-block">
            P2 Win%<br />{(results.p2Wins / played) * 100}<br />
          </div>
        </div>
        <div className="result-block">
          <div className="result-block">
            Ties<br />{results.ties}<br />
          </div>
          <div className="result-block">
            Tie%<br />{(results.ties / played) * 100}<br />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;