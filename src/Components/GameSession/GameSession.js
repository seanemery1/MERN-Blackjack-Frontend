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
import { Redirect } from "react-router";

const GameSession = () => {
    const {userInfo, setInfo, handleSubmit, setAlert} = useContext(UserContext);

   
    
  
        
    
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

        });
        window.location.href=`/u/${userInfo.uuid}`;
    }

    const placeBets = () => {
        if ((userInfo.balance-bet)===0) {
            alert('You cannot bet 0!');
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bet:(userInfo.balance-bet)
                }) 
            };
            fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/PlaceBets`, requestOptions)
            .then(response => response.json())
            .then(
                handleSubmit);
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
        }
        
    }
    function deal() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uuid:userInfo.uuid,
                date: userInfo.gameId,
                deck_id: userInfo.gameSession['deck']['deckID']
            }) 
        };
        fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}/${userInfo.gameSession['_id']}/Deal`, requestOptions)
        .then(response => response.json());
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
    }
  
    const [bet, setBet] = useState(0);
    // if (!(userInfo.gameID===undefined)) {
    //     () => {setBet(userInfo.gameSession['player-hand-bet'])};
    // }
    
    // console.log(userInfo);
    if (userInfo.isLoggedIn) {
        
        let playerCards = [];
        let splitCards = [];
        let dealerCards = [];
        let playerHit = false;
        let playerSplit = false;
        let playerStand = false;
        let playerDouble = false;
        let splitHit = false;
        let splitStand = false;
        let splitDouble = false;
        
        if (userInfo.gameSession['nextMove']==="/Deal") {
            console.log("deal");
            deal();
        }
        if (!(userInfo.gameSession['winnerHand']===undefined)) {
            playerCards =  userInfo.gameSession['player-hand'];
            dealerCards =  userInfo.gameSession['dealer-hand'];
            splitCards =  userInfo.gameSession['player-hand-split'];
            var playerImgs = playerCards.map((card) => {
                return (<img src={card.img}/>);
            });
            var dealerImgs = dealerCards.map((card) => {
                return (<img src={card.img}/>);
            });
            var splitImgs = splitCards.map((card) => {
                return (<img src={card.img}/>);
            });
            let playerHit = userInfo.gameSession['available-actions']['hit'];
            let playerSplit = userInfo.gameSession['available-actions']['split'];
            let playerStand = userInfo.gameSession['available-actions']['stand'];
            let playerDouble = userInfo.gameSession['available-actions']['double'];
            let splitHit = userInfo.gameSession['available-actions-split']['hit'];;
            let splitStand = userInfo.gameSession['available-actions-split']['stand'];
            let splitDouble = userInfo.gameSession['available-actions-split']['double'];
        }

        
        
        return(
            
            <div className="blackjackBoard" onLoad={handleSubmit && (() => setBet(userInfo.gameSession['player-hand-bet']))}>           
                {/* <div className="betRow"> */}
                    {userInfo.gameSession['canLeave'] &&
                    <div className="goBack">
                        <button onClick={goBack}>Go Back To Profile</button>
                    </div>}
                    <div className="playerCards">
                        {!(userInfo.gameSession['player-hand'].length===0) &&
                        userInfo.gameSession['player-hand'].map((e, idx) =>
                            <img src={e.img} key={idx}/>)
                        }
                    </div>
                    <div className="dealerCards">
                        {!(userInfo.gameSession['dealer-hand'].length===0) &&
                        userInfo.gameSession['dealer-hand'].map((e, idx) =>
                            <img src={e.img} key={idx}/>)
                        }
                    </div>
                    {splitCards.length!==0 &&
                    <div className="splitCards">
                        {splitImgs}
                    </div>}
                    
                    <div className="bettingPool">
                        <span>Bet: ${bet}</span>
                        {userInfo.gameSession['canLeave'] && <button onClick={placeBets}>Submit</button> }
                        {userInfo.gameSession['canLeave'] && <button onClick={() => setBet(0)}>Clear</button>}
                    </div>

                    <div className="currentBalance">
                        <body>
                            Bank: ${(userInfo.balance-bet)}
                        </body>
                    </div>
                    {userInfo.gameID !== undefined  && <div className="available-actions-split">
                        {splitHit && <button className="actions">Hit</button>}
                        {splitStand && <button className="actions">Stand</button>}
                        {splitDouble && <button className="actions">Double</button>}
                        {/* <body>
                            NextMove: {userInfo.gameSession['_']}
                        </body> */}
                    </div>}
                    {userInfo.gameID !== undefined && <div className="available-actions">
                        {playerSplit && <button className="actions">Split</button>}
                        {playerHit && <button className="actions">Hit</button>}
                        {playerStand && <button className="actions">Stand</button>}
                        {playerDouble && <button className="actions">Double</button>}
                        {/* <body>
                            NextMove: {userInfo.gameSession['_']}
                        </body> */}
                    </div>}
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
        