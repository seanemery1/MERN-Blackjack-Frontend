import React, { useState, useEffect, useContext, useCallback } from "react";
import "./GameSession.css";
import {withRouter} from "react-router";
import UserContext from '../../libs/UserContext';
import LogOutHooks from "../LogOutHooks/LogOutHooks";
import { setSessionCookie, getSessionCookie } from '../../libs/sessions.js';
import bet10 from '../../imgs/10.png';
import bet25 from '../../imgs/25.png';
import bet100 from '../../imgs/100.png';
import bet500 from '../../imgs/500.png';
import bet1000 from '../../imgs/1000.png';
import cardBack from '../../imgs/cardBack.png';
import CardTransitions from '../../libs/CardTransitions.js';
import cx from "classnames";
import { Redirect } from "react-router";

const GameSession = () => {
    const {userInfo, setInfo, refreshUpdate, setAlert1, alert1} = useContext(UserContext);

    const goBack = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:5000/DeleteGameSession/${userInfo.uuid}/${userInfo.gameID}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            //setUserInfo({
                setSessionCookie({
                isLoggedIn: userInfo.isLoggedIn,
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
                uuid: userInfo.uuid,
                balance: userInfo.balance,
                gameID: undefined,
                gameSession: {}
        });
         setInfo({
            isLoggedIn: userInfo.isLoggedIn,
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            uuid: userInfo.uuid,
            balance: userInfo.balance,
            gameID: undefined,
            gameSession: {}
        });

        }).then(refreshUpdate);
        window.location.href=`/u/${userInfo.uuid}`;
    }

    async function playerAction(action, hand, double) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                deckID: userInfo.gameSession['deck']['deckID'],
                hand: hand,
                double: double
            })
        };
        let url;
        if (action==='split') {
            url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/Split`;
            console.log(action);
            await fetch(url, requestOptions)
            .then(response => response.json())
            .then(refreshUpdate);
        } else if (action==='hit') {
            url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/Hit/${hand}`;
            console.log(action);
            await fetch(url, requestOptions)
            .then(response => response.json())
            
            .then((data) => {dealerLoop(data.nextMove)}).then(refreshUpdate);
            // if (userInfo.gameSession['nextMove']==='dealer')  {
                
            // }  
        } else if (action==='standDouble') {
            console.log(action);
            url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/StandDouble/${hand}`;
            if (double) {
                await fetch(url, requestOptions)
                .then(response => response.json());
                playerAction('hit', hand, true);
            } else {
                await fetch(url, requestOptions)
                .then(response => response.json())
                
                .then((data) => {dealerLoop(data.nextMove)}).then(refreshUpdate);
                // if (userInfo.gameSession['nextMove']==='dealer')  {
                //     dealerLoop();
                // }  
            }
        }
        
            
    }

   

    async function placeBets(){
        if (bet===0) {
            alert('You cannot bet 0!');
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bet:(bet)
                }) 
            };
            await fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/PlaceBets`, requestOptions)
            .then(response => response.json())
            .then(refreshUpdate)
            .then(() => deal());
        }
        
    }
    async function deal() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // uuid:userInfo.uuid,
                // date: userInfo.gameId,
                deckID: userInfo.gameSession['deck']['deckID']
            }) 
        };
        await fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/Deal`, requestOptions)
        .then(response => response.json()).then(refreshUpdate);
         
    }
    // function alerts(alert) {
    //     switch(alert) {
    //         case 'blackjack':
    //             alert('Blackjack! The House Automatically Pays 1.5x of Original Bet.');
    //             //reset;
    //         case 'handbust':
    //             alert(`Uh Oh! Looks Like You've Gone Bust. Try Again!`);
    //         case 'doublebust':
    //             alert(`Uh Oh! Looks Like You've Gone Bust on Both Hands. Try Again!`);
    //     }
        
    // }
    async function dealerLoop(nextMove) {
        console.log('dealerloop');
        // await setTimeout(function() {return;}, 10000);
        console.log(nextMove);
        if (nextMove!=='dealer') {
            if (nextMove==='nextGame') {
                resetGame();
                // alert('fin');
                console.log('woo');
            } else {
                return;
            }
            // alerts();
            
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uuid:userInfo.uuid,
                    date: userInfo.gameId,
                    deckID: userInfo.gameSession['deck']['deckID']
                }) 
            };
            await fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/Dealer`, requestOptions)
            .then(await new Promise(resolve => setTimeout(resolve, 2000)))
            .then(response => response.json()).then((data) => {dealerLoop(data.nextMove)}).then(refreshUpdate);
            // setTimeout(function() {return;}, 1000);
            // if (userInfo.gameSession['nextMove']==='dealer') {
            //     dealerLoop();
            // }
        }
        
        //tie player bust dealer blackjack none TBD
    }
    async function resetGame() {
        console.log('resetgame!');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                deckID: userInfo.gameSession['deck']['deckID'],
                shuffled: userInfo.gameSession['deck']['shuffled'],
                remaining: userInfo.gameSession['deck']['remaining'],
                resume: true
                
            })
        };
        await fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}`, requestOptions)
            .then(response => response.json())
            .then(await new Promise(resolve => setTimeout(resolve, 2000)))
            .then(
                (data) => {
                    setBet(0);
                    setInfo({
                                isLoggedIn: userInfo.isLoggedIn,
                                name: userInfo.name,
                                email: userInfo.email,
                                password: userInfo.password,
                                uuid: userInfo.uuid,
                                balance: userInfo.balance,
                                gameID: data._id,
                                gameSession: data
                        });
                            setSessionCookie({
                                isLoggedIn: userInfo.isLoggedIn,
                                name: userInfo.name,
                                email: userInfo.email,
                                password: userInfo.password,
                                uuid: userInfo.uuid,
                                balance: userInfo.balance,
                                gameID: data._id,
                                gameSession: data
                            });
                // setInfo({
                //     isLoggedIn: data.isLoggedIn,
                //     name: data.name,
                //     email: data.email,
                //     password: data.password,
                //     uuid: data.uuid,
                //     balance: data.balance,
                //     gameID: data.gameID,
                //     gameSession: data.gameSession
                // });
                // setSessionCookie({
                //     isLoggedIn: data.isLoggedIn,
                //     name: data.name,
                //     email: data.email,
                //     password: data.password,
                //     uuid: data.uuid,
                //     balance: data.balance,
                //     gameID: data.gameID,
                //     gameSession: data.gameSession
                // });
        }).then(refreshUpdate);
        
    }
    
    const [show, setShow] = useState(false);
    const [bet, setBet] = useState(0);
 
    
    console.log(userInfo);
    if (userInfo.isLoggedIn) {
        
       
        
        if (userInfo.gameID!==null) {
            return(
            
                <div className="blackjackBoard" onLoad={refreshUpdate && (() => setBet(userInfo.gameSession['player-hand-bet']))}>           
                    {/* <div className="betRow"> */}
                    
                        {userInfo.gameSession['canLeave'] &&
                        <div className="goBack">
                            <button onClick={goBack}>Go Back To Profile</button>
                        </div>}
                
                        
                        {!(userInfo.gameSession['player-hand'].length===0) &&
                            <div className="playerInfo">{userInfo.gameSession['nextMove']}</div>
                            }
                        <div className="playerCards">
                            {userInfo.gameSession['player-hand'].length!==0 &&
                            <body>
                                {`Player: `}
                                {userInfo.gameSession['player-hand-ace']
                                ?
                                    (userInfo.gameSession['player-hand-count']+10>21)
                                    ?
                                    userInfo.gameSession['player-hand-count']
                                    :
                                        userInfo.gameSession['nextMove']==='dealer'
                                        ?
                                        userInfo.gameSession['player-hand-count'] + 10
                                        :
                                        (userInfo.gameSession['player-hand-count'], "/", + userInfo.gameSession['player-hand-count'] + 10)
                                :
                                    userInfo.gameSession['player-hand-count']
                                }
                            </body>}
                            {/* {userInfo.gameSession['player-hand-blackjack'] ?
                            // <br></br>&&
                            prompt('Blackjack!')  : null} */}
                            {userInfo.gameSession['player-hand'].length!==0 &&
                            userInfo.gameSession['player-hand'].map((e, idx) =>
                                <CardTransitions show={!show}>
                                    <img src={e.img} key={e.id}/>
                                </CardTransitions>
                                
                                // className={alert ? "cards-entrance" : "card-loaded"}
                                // alert ? "cards-entrance" : 
                            )}
                            {userInfo.gameSession['player-hand'].length!==0 && <div className="available-actions">
                                {userInfo.gameSession['available-actions']['split'] && <button className="actions"
                                onClick={() => {playerAction('split', 'OriginalHand', false);
                                setTimeout(function() {this.disabled = false;}, 2000)}}>Split</button>}

                                {userInfo.gameSession['available-actions']['hit'] && <button className="actions"
                                onClick={() => {playerAction('hit', 'OriginalHand', false);
                                setTimeout(function() {this.disabled = false;}, 2000)}}>Hit</button>}

                                {userInfo.gameSession['available-actions']['stand'] && <button className="actions"
                                onClick={() => {playerAction('standDouble', 'OriginalHand', false);
                                setTimeout(function() {this.disabled = false;}, 2000)}}>Stand</button>}

                                {userInfo.gameSession['available-actions']['double'] && <button className="actions"
                                onClick={() => {playerAction('standDouble', 'OriginalHand', true);
                                setTimeout(function() {this.disabled = false;}, 2000)}}>Double</button>}
                                {/* <body>
                                    NextMove: {userInfo.gameSession['_']}
                                </body> */}
                            </div>}
                            {userInfo.gameSession['player-hand-split'].length!==0 &&
                            <body>
                                {`2nd Hand: `}
                                {userInfo.gameSession['player-hand-split-ace']
                                ?
                                    (userInfo.gameSession['player-hand-split-count']+10>21)
                                    ?
                                    userInfo.gameSession['player-hand-split-count']
                                    :
                                        userInfo.gameSession['nextMove']==='dealer'
                                        ?
                                        userInfo.gameSession['player-hand-split-count'] + 10
                                        :
                                        (userInfo.gameSession['player-hand-split-count'], "/", + userInfo.gameSession['player-hand-split-count'] + 10)
                                :
                                    userInfo.gameSession['player-hand-split-count']
                                }
                            </body>}
                            {!(userInfo.gameSession['player-hand-split'].length===0) &&
                            userInfo.gameSession['player-hand-split'].map((e, idx) =>
                                <CardTransitions show={!show}>
                                    <img src={e.img} key={e.id}/>
                                </CardTransitions>)
                            }
                            
                            {(userInfo.gameSession['player-hand-split'].length!==0)  && <div className="available-actions-split">
                                {/* {userInfo.gameSession['available-actions-split']['hit'] && <button className="actions" >Hit</button>} onClick={playerAction('hit', 'OriginalHand')} */}
                                {userInfo.gameSession['available-actions-split']['hit'] && <button className={userInfo.gameSession['nextMove']==='split' ? "actions" : "actions disabled"}
                                onClick={() => {playerAction('hit', 'SplitHand', false);
                                setTimeout(function() {this.disabled = false;}, 2000)}}>Hit</button>}

                                {userInfo.gameSession['available-actions-split']['stand'] && <button className={userInfo.gameSession['nextMove']==='split' ? "actions" : "actions disabled"}
                                onClick={() => {playerAction('standDouble', 'SplitHand', false);
                                setTimeout(function() {this.disabled = false;}, 2000)}}>Stand</button>}

                                {userInfo.gameSession['available-actions-split']['double'] && <button className={userInfo.gameSession['nextMove']==='split' ? "actions" : "actions disabled"}
                                onClick={() => {playerAction('standDouble', 'SplitHand', true)
                                setTimeout(function() {this.disabled = false;}, 2000)}}>Double</button>}
                        </div>}
                        </div>
                        <div className="dealerInfo"></div>
                        <div className="dealerCards">
                        {userInfo.gameSession['dealer-hand'].length!==0 &&
                            <body>
                                {`Dealer: `}

                                {userInfo.gameSession['nextMove']==='dealer'||userInfo.gameSession['nextMove']==='nextGame'
                                
                                ?

                                    (userInfo.gameSession['dealer-hand-ace'])
                                    ?
                                        userInfo.gameSession['dealer-hand-count-true']+10 <=21
                                        ?
                                        userInfo.gameSession['dealer-hand-count-true']+10
                                        :
                                        userInfo.gameSession['dealer-hand-count-true']
                                        
                                    :
                                        userInfo.gameSession['dealer-hand-count-true']
                                :
                                    userInfo.gameSession['dealer-hand-count-hidden']
                                }
                            </body>
                        }
                        {userInfo.gameSession['dealer-hand'].length!==0 &&
                        userInfo.gameSession['dealer-hand'].map((e, idx) =>
                            <CardTransitions show={!show}>
                                {idx===0 ?
                                <div className={userInfo.gameSession['nextMove']==='dealer'||userInfo.gameSession['nextMove']==='nextGame' ? "flip-card" : "flip-card"}>
                                    <div className={userInfo.gameSession['nextMove']==='dealer'||userInfo.gameSession['nextMove']==='nextGame' ? "flip-card-inner flipped" : "flip-card-inner"} >
                                        <div className="flip-card-front">
                                            <img className="back" src={cardBack} key={cardBack.id}/>
                                        </div>
                                        <div className="flip-card-back" >
                                            <img className="face" src={e.img} key={e.id}/>
                                        </div>
                                    </div>
                                </div>

                                :
                                <img src={e.img} key={idx}/>}
                                
                            </CardTransitions>
                        )}
                        </div>
                        
                        <div className="bettingPool">
                            <span>Bet: ${bet}</span>
                            <br/>
                            {userInfo.gameSession['canLeave'] && userInfo.gameSession['nextMove']!=="nextGame" && <button onClick={() => placeBets()}>Submit</button> }
                            {userInfo.gameSession['canLeave'] && userInfo.gameSession['nextMove']!=="nextGame" && <button onClick={() => setBet(0)}>Clear</button>}
                        </div>
    
                        <div className="currentBalance">
                            <body>
                                Bank: ${(userInfo.balance-bet)}
                            </body>
                        </div>
                        <div className="deckSize">
                            <body>
                                Deck Size: {(userInfo.gameSession['deck']['remaining'])}/312
                            </body>
                        </div>
                        
                        
                        <div className={userInfo.gameSession['canLeave'] ? "betRow one" : "betRow one disabled"}  onClick={() => {
                            if (userInfo.gameSession['canLeave']) {
                                if ((bet + 10) <= userInfo.balance) {
                                    setBet(bet + 10)
                                }}}
                            }>
                            <img src={bet10} alt="bet10"/>
                            <div className="centered" >$10</div>
                        </div>
                        <div className={userInfo.gameSession['canLeave'] ? "betRow two" : "betRow two disabled"} onClick={() => {
                            if (userInfo.gameSession['canLeave']) {
                                if ((bet + 25) <= userInfo.balance) {
                                    setBet(bet + 25)
                                }}}
                            }>
                            <img src={bet25} alt="bet25"/>
                            <div className="centered">$25</div>
                        </div>
                        <div className={userInfo.gameSession['canLeave'] ? "betRow three" : "betRow three disabled"} onClick={() => {
                            if (userInfo.gameSession['canLeave']) {
                                if ((bet + 100) <= userInfo.balance) {
                                    setBet(bet + 100)
                                }}}
                            }>
                            <img src={bet100} alt="bet100"/>
                            <div className="centered">$100</div>
                        </div>
                        <div className={userInfo.gameSession['canLeave'] ? "betRow four" : "betRow four disabled"}  onClick={() => {
                            if (userInfo.gameSession['canLeave']) {
                                if ((bet + 500) <= userInfo.balance) {
                                    setBet(bet + 500)
                                }}}
                            }>
                            <img src={bet500} alt="bet500"/>
                            <div className="centered">$500</div>
                        </div>
                        <div className={userInfo.gameSession['canLeave'] ? "betRow five" : "betRow five disabled"}  onClick={() => {
                            if (userInfo.gameSession['canLeave']) {
                                if ((bet + 1000) <= userInfo.balance) {
                                    setBet(bet + 1000)
                                }}}
                            }>
                    
                            <img src={bet1000} alt="bet1000" />
                            <body className="centered">$1k</body>
                        </div>
                   {/* </div> */}
                </div>
                    
               
            );
        
        //     else {
        //         return(
        //               <div className="blackjackBoard">
        //                  <h1>{userInfo.GameSession._id}</h1>
        //              </div>
        //         );
             
       
        //    } 
        }
        else {
            <div>Retrieving game info</div>
        }
        
        
      
    } else {
        return(
            <div>
                <h1>
                    Error! User is undefined! Please press "Sign Out" to return to the home page
                </h1>
                <LogOutHooks></LogOutHooks>
            </div>
        );
    
        
    }
}

export default GameSession;


   // setInfo(userInfo));
            
        //     setSessionCookie({
        //     isLoggedIn: userInfo.isLoggedIn,
        //     name: userInfo.name,
        //     email: userInfo.email,
        //     password: userInfo.isLoggedIn,
        //     uuid: userInfo.uuid,
        //     balance: userInfo.balance,
        //     gameID: userInfo.gameSession['_id'],
        //     gameSession: userInfo.gameSession
        // }));
        // setInfo({
        //     isLoggedIn: userInfo.isLoggedIn,
        //     name: userInfo.name,
        //     email: userInfo.email,
        //     password: userInfo.isLoggedIn,
        //     uuid: userInfo.uuid,
        //     balance: userInfo.balance,
        //     gameID: userInfo.gameSession['_id'],
        //     gameSession: userInfo.gameSession
        // });
        // refresh();
        // handleObjectChange = id => {
    //     const object = data.find(id)
    // }
    // document.getElementById('add-to-list').onload = function() {
    //     var list = document.getElementById('list');
    //     var newLI = document.createElement('li');
    //     newLI.innerHTML = 'A new item';
    //     list.appendChild(newLI);
    //     setTimeout(function() {
    //       newLI.className = newLI.className + " show";
    //     }, 10);
    //   }
    // add = function() {
    //     listItems = document.getElementsByTagName('img');
    //     var lastItem = listItems[listItems.length - 1]
    //     var newItem = document.createElement('li');
    //     newItem.innerHTML = "4";
      
    //     newItem.classList.add("newItem");
      
    //     lastItem.parentNode.insertBefore(newItem, lastItem);
    //   }
    // const Cover ({src, alt}) => {
    //     const {}
    // }

 // function playerHit() {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             deckID: userInfo.gameSession['deck']['deckID'],
    //             hand: hand
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/Hit/OriginalHand`;
    //     console.log("hit");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then(refreshUpdate);
    // }

    // function playerStand(hand) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             double: false,
    //             deckID: userInfo.gameSession['deck']['deckID'],
    //             hand: hand
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/StandDouble/OriginalHand`;
    //     console.log("stand");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then((data) => console.log("This is your data", data)
    //     .then(refreshUpdate)
    //     );
    // }
    // const playerDouble = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             double: true,
    //             deckID: userInfo.gameSession['deck']['deckID'],
    //             hand: 'OriginalHand'
                
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/StandDouble/OriginalHand`;
    //     console.log("double");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
        
    //     .then((data) => (data.hand==="OriginalHand") ? player
    //         console.log("This is your data", data.hand, " ", data.nextMove)).then(refreshUpdate);
    // }
    // const playerHit = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             deckID: userInfo.gameSession['deck']['deckID']
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/Hit/OriginalHand`;
    //     console.log("hit");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then(refreshUpdate);
    // }

    // const playerStand = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             double: false,
    //             deckID: userInfo.gameSession['deck']['deckID'],
    //             hand: 'OriginalHand'
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/StandDouble/OriginalHand`;
    //     console.log("stand");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then((data) => console.log("This is your data", data)
    //     .then(refreshUpdate)
    //     );
    // }
    // const playerDouble = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             double: true,
    //             deckID: userInfo.gameSession['deck']['deckID'],
    //             hand: 'OriginalHand'
                
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/StandDouble/OriginalHand`;
    //     console.log("double");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
        
    //     .then((data) => (data.hand==="OriginalHand") ? player
    //         console.log("This is your data", data.hand, " ", data.nextMove)).then(refreshUpdate);
    // }
    // const splitStand = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             double: false,
    //             deckID: userInfo.gameSession['deck']['deckID'],
    //             hand: 'SplitHand'
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/StandDouble/OriginalHand`;
    //     console.log("stand");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
    //     .then((data) => console.log("This is your data", data)
    //     .then(refreshUpdate)
    //     );
    // }
    // const splitDouble = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             double: true,
    //             deckID: userInfo.gameSession['deck']['deckID'],
    //             hand: 'SplitHand'
                
    //         })
    //     };
    //     let url = `http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/StandDouble/OriginalHand`;
    //     console.log("double");
    //     fetch(url, requestOptions)
    //     .then(response => response.json())
        
    //     .then((data) => console.log("This is your data", data.hand, " ", data.nextMove)).then(refreshUpdate);
    // }



















    // let playerCards = [];
        // let splitCards = [];
        // let dealerCards = [];
        // let playerHit = false;
        // let playerSplit = false;
        // let playerStand = false;
        // let playerDouble = false;
        // let splitHit = false;
        // let splitStand = false;
        // let splitDouble = false;
        
        // if (!(userInfo.gameSession['winnerHand']===undefined)) {
        //     playerCards =  userInfo.gameSession['player-hand'];
        //     dealerCards =  userInfo.gameSession['dealer-hand'];
        //     splitCards =  userInfo.gameSession['player-hand-split'];
        //     var playerImgs = playerCards.map((card) => {
        //         return (<img src={card.img}/>);
        //     });
        //     var dealerImgs = dealerCards.map((card) => {
        //         return (<img src={card.img}/>);
        //     });
        //     var splitImgs = splitCards.map((card) => {
        //         return (<img src={card.img}/>);
        //     });
        //     let playerHit = userInfo.gameSession['available-actions']['hit'];
        //     let playerSplit = userInfo.gameSession['available-actions']['split'];
        //     let playerStand = userInfo.gameSession['available-actions']['stand'];
        //     let playerDouble = userInfo.gameSession['available-actions']['double'];
        //     let splitHit = userInfo.gameSession['available-actions-split']['hit'];;
        //     let splitStand = userInfo.gameSession['available-actions-split']['stand'];
        //     let splitDouble = userInfo.gameSession['available-actions-split']['double'];
        // }

// old place bets
  // setInfo(userInfo));
                
            //     setSessionCookie({
            //     isLoggedIn: userInfo.isLoggedIn,
            //     name: userInfo.name,
            //     email: userInfo.email,
            //     password: userInfo.password,
            //     uuid: userInfo.uuid,
            //     balance: userInfo.balance,
            //     gameID: userInfo.gameSession['_id'],
            //     gameSession: userInfo.gameSession
            // }));
            // setInfo({
            //     isLoggedIn: userInfo.isLoggedIn,
            //     name: userInfo.name,
            //     email: userInfo.email,
            //     password: userInfo.password,
            //     uuid: userInfo.uuid,
            //     balance: userInfo.balance,
            //     gameID: userInfo.gameSession['_id'],
            //     gameSession: userInfo.gameSession
            // });
            // refresh();



// const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//         email: user.getEmail(),
//         name: user.getName(),
//         password: ""
//     })
// };


//     if (myContext.userInfo.gameSession['nextMove']==="/PlaceBets"){
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 balance: myContext.userInfo.balance,
    //             })
    //         };
            
    //     }
    //     else if (myContext.userInfo.gameSession['canLeave']===true) {
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 balance: myContext.userInfo.balance,
    //             })
    //         };
    //         fetch(`http://localhost:5000/NewGameSession/${myContext.userInfo.uuid}`, requestOptions)
    //         .then(response => response.json())
    //         .then((data) => {
    //             myContext.setUserInfo({
    //                 isLoggedIn: myContext.userInfo.isLoggedIn,
    //                 name: myContext.userInfo.name,
    //                 email: myContext.userInfo.email,
    //                 uuid: myContext.userInfo.uuid,
    //                 balance: myContext.userInfo.balance,
    //                 gameID: data._id,
    //                 gameSession: data
    //         });
    //             setSessionCookie({
    //                 isLoggedIn: myContext.userInfo.isLoggedIn,
    //                 name: myContext.userInfo.name,
    //                 email: myContext.userInfo.email,
    //                 uuid: myContext.userInfo.uuid,
    //                 balance: myContext.userInfo.balance,
    //                 gameID: data._id,
    //                 gameSession: data
    //             });
    //         });
    //     }
    // }, []);
        








    
  
        
    
    // async function refresh() {
        
    //     return response;
    // // }
    // let data;
    // useEffect(() => {
    //     async function refresh() {
    //         let response = await fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`);
    //         response = await response.json();
    //         return response;
    //     }
    //     data = refresh();
    //     setSessionCookie(data);
    //     setInfo(data);
        
    //     // let response = refresh()
    //     // response = {
    //     //     isLoggedIn: userInfo.isLoggedIn,
    //     //     name: userInfo.name,
    //     //     email: userInfo.email,
    //     //     uuid: userInfo.uuid,
    //     //     balance: userInfo.balance,
    //     //     gameID: response._id,
    //     //     gameSession: response
    //     // }
    // }, []);
    // useEffect(() => {
    //     async function refresh() {
    //         let response = await fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`);
    //         response = await response.json();
    //         return response;
    //     }
    //     data = refresh();
    //     setSessionCookie(data);
    //     setInfo(data);
        
    //     // let response = refresh()
    //     // response = {
    //     //     isLoggedIn: userInfo.isLoggedIn,
    //     //     name: userInfo.name,
    //     //     email: userInfo.email,
    //     //     uuid: userInfo.uuid,
    //     //     balance: userInfo.balance,
    //     //     gameID: response._id,
    //     //     gameSession: response
    //     // }
    // }, [data]);
    //     .then((data) => {
    //         setUserInfo({
    //             isLoggedIn: userInfo.isLoggedIn,
    //             name: userInfo.name,
    //             email: userInfo.email,
    //             uuid: userInfo.uuid,
    //             balance: userInfo.balance,
    //             gameID: data._id,
    //             gameSession: data
    //     });
    //         setSessionCookie({
    //             isLoggedIn: userInfo.isLoggedIn,
    //             name: userInfo.name,
    //             email: userInfo.email,
    //             uuid: userInfo.uuid,
    //             balance: userInfo.balance,
    //             gameID: data._id,
    //             gameSession: data
    //     });
    //     });
    // }        
    // , []);
    // let response = await fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         setUserInfo({
    //             isLoggedIn: userInfo.isLoggedIn,
    //             name: userInfo.name,
    //             email: userInfo.email,
    //             uuid: userInfo.uuid,
    //             balance: userInfo.balance,
    //             gameID: data._id,
    //             gameSession: data
    //     });
    //         setSessionCookie({
    //             isLoggedIn: userInfo.isLoggedIn,
    //             name: userInfo.name,
    //             email: userInfo.email,
    //             uuid: userInfo.uuid,
    //             balance: userInfo.balance,
    //             gameID: data._id,
    //             gameSession: data
    //     });
    //     });
    
    