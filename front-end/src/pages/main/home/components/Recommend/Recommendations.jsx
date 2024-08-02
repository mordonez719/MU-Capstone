/*

Recommendations.jsx

Generates and displays exercise recommendations based on
collected user data.

Calls: Carousel
Called In: HomePage

*/

import './Recommendations.css'
import { useState, useEffect } from 'react'
import Carousel from './Carousel'

function Recommendations(props) {
    const [history, setHistory] = useState([]) // queries
    
    const [cards, setCards] = useState([]) // recommendation displays

    const [exTypes, setExTypes] = useState([]) // filter histories
    const [muscles, setMuscles] = useState([])
    const [difficulties, setDiffs] = useState([])
    
    const [added, setAdded] = useState([]) // names of previously added exercises
    const [recents, setRecents] = useState([]) // recently added exercises

    const user = props.user
    let topWords = []
    let searches = []
    const results = [];
    const toCompare = [];
    let new_cards = []
    let topSimilarities = [];
    const rec_covers = [
        "https://img.freepik.com/free-vector/fitness-gym-interior-background-room-with-sport-equipment-workouts-treadmill-bike-dumbbells-barbell-water-cooler-mat-floor_575670-1344.jpg?t=st=1722479361~exp=1722482961~hmac=2e407199de88ee465ebe48940c1070634cdd3b271c797e2bd3fbab50214fb9d7&w=2000",
        "https://img.freepik.com/free-vector/vector-cartoon-background-gym-with-girls-doing-fitness_33099-1205.jpg?w=2000&t=st=1722479082~exp=1722479682~hmac=a3e2eba1d8c30fe94072e7463564cc63ccdf4808307c188ed6acaca1d5dcb924",  
        "https://img.freepik.com/free-vector/cartoon-background-home-gym-with-window_1441-2776.jpg?w=2000&t=st=1722479166~exp=1722479766~hmac=b366e3d3831352b7fee5253c3f371fe83bb33aa544f6526987e8a9cd53f7ce4d",        
        "https://img.freepik.com/free-vector/gradient-home-gym_23-2148811395.jpg?w=2000&t=st=1722479275~exp=1722479875~hmac=46a980c6dd29076553d5057942ca59447fe8a6e3bf8a77ec03f0fd2da3d559e6",
        "https://img.freepik.com/free-vector/sport-club-gym-spacious-interior-cartoon-vector-with-various-fitness-equipment-machines-body-workout_33099-1297.jpg?t=st=1722479912~exp=1722483512~hmac=5967f704ca8131d60d15fe9e33fbf65dacf8ccde19e4840f7aef46a99a288b0b&w=2000"
    ];

    // get search history, queries and filters
    const fetchHistory = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/data`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setHistory(data.exSearches) // recent queries
        setExTypes(data.exTypes) // recent type filters
        setMuscles(data.muscles) // recent muscle filters
        setDiffs(data.difficulties) // recent difficulty filters
    };

    // get names of exercises previously added by user
    const fetchAdded = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/exercises`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setAdded(data);
    };

    // get exercises recently added by user
    const fetchRecents = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/recent/exercises`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setRecents(data);
    };

    useEffect(() => { // fetch the search history when the user makes a new search
        fetchHistory();
      },[props.searchChange])

    useEffect(() => { // generates and displays recommendations when the search history changes
        fetchAdded().then(() => {
            fetchRecents().then(() => {
            fetchWords().then(() => {
                const sortedWords = reduceSort(topWords) // sorts unique words in the array by frequency
                const sortedTypes = reduceSort(exTypes)
                const sortedMuscles = reduceSort(muscles);
                const sortedDiffs = reduceSort(difficulties);
                listSearches(sortedWords, sortedMuscles, sortedTypes, sortedDiffs) // generate searches with sorted user data
                fetchData(searches).then(() => { // get possible recs
                    compare(); // compare to recently added
                    makeRecs(); // get best exercises
                    makeCards(recs); // make displays
                    setCards(new_cards); // set final recs
                })
            })
        })
        })
    }, [history])


    // call top words api to find related words to recent queries
    const fetchWords = async () => {
        for (let index in history){ // for each query in the history, get the top related word
            if (history[index]) {
                const baseURL = `https://api.datamuse.com/words?ml=${history[index]}&topics=workout,exercise,muscle`  
                const response = await fetch(baseURL);
                const data = await response.json();
                topWords.push(data[0].word)
            }
        }
    }

    // reduces an array to hold each value once, sorted by frequency
    function reduceSort(array) {
        const frequencyMap = {};
        array.forEach(filter => {
            if (!frequencyMap[filter]) {
                frequencyMap[filter] = 1;
            } else {
                frequencyMap[filter]++;
            }
        });
        const orderedMap = Object.entries(frequencyMap).sort((a,b) => b[1] - a[1]);
        return orderedMap.map(([word]) => word);
    }

    // generates a list of searches the user might like; fields in order of importance: queries, muscle groups, type, difficulty
    function listSearches(topQueries, topMuscles, topTypes, topDifficulties){       
        for (let i = 0; i < topQueries.length; i++) {
            let search_map = {}
            search_map["query"] = topQueries[i];
            search_map["muscle"] = "Any";
            search_map["type"] = "Any";
            search_map["difficulty"] = "Any";
            searches.push(search_map) // add a no-filter search for each related query
        }

        for (let i = 0; i < topMuscles.length; i++) { // iterate through sorted filters in order of category weight and generate searches
            for (let j = 0; j < topTypes.length; j++) {
                for (let k = 0; k < topDifficulties.length; k++) {
                    if (searches.length >= 10) { // stop if 10 searches have been generated
                        break;
                    }
                    if (topMuscles[i] === "Any" && topTypes[j] === "Any" && topDifficulties[k] === "Any"){
                        break; // if no-filter search is reached before the array reaches ten, move to next filter -> postponing no-filter search allows for more personalized recs.
                    }
                    let search_map = {}
                    search_map["query"] = "";
                    search_map["muscle"] = topMuscles[i];
                    search_map["type"] = topTypes[j];
                    search_map["difficulty"] = topDifficulties[k];
                    searches.push(search_map) // add search with current filters
                }
            }
        }

        let search_map = {}
        search_map["query"] = "";
        search_map["muscle"] = "Any";
        search_map["type"] = "Any";
        search_map["difficulty"] = "Beginner";
        searches.push(search_map) // adds a beginner search, will recommend beginner exercises if no results were found from the user's data or if the user is new
    }

    // use generated searches to fetch list of potential recommendations
    const fetchData = async (searches) => {
        const API_KEY = "blh/YcO1GAxLzjv/r35Y9g==0W271Io3ZcFagH9s";
        
        for (let i = 0; i < searches.length; i++){
            let search = searches[i]
        
            // if the filter is not "Any", populate a filter string
            let nameQuery = ""
            if (search.query){
                nameQuery = `&name=${search.query}`}

            let muscleQuery = ""
            if (search.muscle != "Any"){
                muscleQuery = `&muscle=${search.muscle}`}
            
            let typeQuery = ""

            if (search.type !="Any"){
                typeQuery = `&type=${search.type}`}

            let diffQuery = ""
            if (search.difficulty !="Any"){
                diffQuery = `&difficulty=${search.difficulty}`}

            // puts all queries together to form full string for fetching
            let apiURL = `https://api.api-ninjas.com/v1/exercises?${nameQuery}${muscleQuery}${typeQuery}${diffQuery}`

            const options = {
                method: "GET",
                headers: {
                "X-Api-Key": API_KEY,
                },
            };

            const response = await fetch(apiURL, options);
            const data = await response.json();

            for (let i = 0; i < data.length; i++){
                let exercise = data[i];
                if (!added.includes(exercise.name)){ // if the user has not already added the returned exercise, add to results
                    results.push(exercise)
                    toCompare.push(`${exercise.name}, ${exercise.type}, ${exercise.muscle}, ${exercise.equipment}, ${exercise.difficulty}`) // turn the exercise into a string and push to different list
                }
                if (results.length === 10) break; // stop adding when the rec list reaches 10
            }
            if (results.length === 10) break; // stop when rec list reaches 10
            }
    }

    // compare fetched possible recommendations to a user's recently added exercises to find the best matches
    function compare(){
        let similarMap = {} // keeps similarity score mapped to exercise index
        let list = [];

        for (let i = 0; i < recents.length; i++){ // turns recently added exercises to a string for comparing
            let exercise = recents[i];
            list.push(`${exercise.name}, ${exercise.type}, ${exercise.muscle}, ${exercise.equipment}, ${exercise.difficulty}`)
        }

        for (let i = 0; i < list.length; i++) { // find the percentage similarity between the recently added and the recommendation results
            for (let j = 0; j < toCompare.length; j++){
                var perc=Math.round(similarity(list[i],toCompare[j])*1000000)/10000; // get %
                if (similarMap[perc]){
                    similarMap[perc].push(j) // map % keys to an array of indicies of exercises with that % similarity
                } else {
                    similarMap[perc] = [j]
                }
            }
        }

        const keys = Object.keys(similarMap);
        const sortedKeys = keys.sort((a, b) => parseFloat(b) - parseFloat(a)); // sort the map to be from highest to lowest key values (%)
        for (let i = 0; i < sortedKeys.length; i++){
            let percentage = sortedKeys[i]
            for (let j = 0; j < similarMap[percentage].length; j++){ // iterate through the array of indices in each map value
                let exercise_index = similarMap[percentage][j];
                if (!topSimilarities.includes(exercise_index)){ // if the exercise index is not already included, add it to a list of most similar indicies
                    topSimilarities.push(exercise_index)
                    }
                if (topSimilarities.length === 5) break; // stop when we have the 5 most similar
                }
            if (topSimilarities.length === 5) break;
        }

        if (topSimilarities.length === 0){ // if there were not enough results (user has no recently added), set most similar to first five returned from the api
            topSimilarities = [0, 1, 2, 3, 4]
        }
    }

    // code taken from codepad.co -- https://codepad.co/snippet/javascript-calculating-similarity-between-two-strings
    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
          longer = s2;
          shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength === 0) {
          return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
      
    // code taken from codepad.co -- https://codepad.co/snippet/javascript-calculating-similarity-between-two-strings
    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
      
        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
          var lastValue = i;
          for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
              costs[j] = j;
            else {
              if (j > 0) {
                var newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1))
                  newValue = Math.min(Math.min(newValue, lastValue),
                    costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
              }
            }
          }
          if (i > 0)
            costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    let recs = [];

    function makeRecs(){ // for each index in topSimilarites, add the matching exercise to the list of recommendations
        let temp = [];
        for (let i = 0; i < topSimilarities.length; i++){
            let exercise_index = topSimilarities[i];
            let exercise = results[exercise_index];
            temp.push(exercise)
        }
        recs = temp;
    }

    function makeCards(recs){ // make a display card for each recommendation in the list
        let temp = [];
        for (let i = 0; i < recs.length; i++){
            let exercise = recs[i];
            if (exercise){
                temp.push(
                    {
                        "name": exercise.name,
                        "src": rec_covers[i],
                        "alt": `img ${i}`,
                        "equipment": exercise.equipment,
                        "instructions": exercise.instructions,
                        "difficulty": exercise.difficulty,
                        "muscle": exercise.muscle,
                        "type": exercise.type
                    }
                )
            };
        };
        new_cards = temp;
    }

    return (
        <>
        <div id="recommendation-container">
            <Carousel data={cards} user={user}/>
        </div>
        </>
    )
}

export default Recommendations