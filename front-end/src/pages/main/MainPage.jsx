import './MainPage.css'

function MainPage(props){
    return(
        <div id="main">
        <header>
            <span id="head-content">
                <p id="title">Capstone</p>
                <p id="profile-name">Logged in as: {props.user}</p>
            </span>
        </header>
        <main>
            {props.user}
        </main>
        <footer>
            Tabs Here
        </footer>
        </div>
    )
}

export default MainPage