(() => {
    $("#content").css('height', `calc(100% - ${$("header").css('height')} - ${$("footer").css('height')})`);
})();

let items = [];
let players = [];
let campaigns = [];

firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
        document.location.href = "./auth";
        $("#sign-in").css('display', "block");
        $("#sign-in").css('color', "inherit");
        $("#sign-name").css('display', "none");
    }else {
        $("#sign-name").css('display', "block");
        $("#sign-in").css('display', "none");
        $("#sign-name").html(user.displayName);

        // renderDOM(items, players, campaigns, user);

        await db.collection(`users/${user.uid}/campaigns`).orderBy("running", "asc").limit(1).get().then(qs => qs.forEach(doc => db.doc(doc.data().ref.path).get().then(q => { campaigns.push( {a: q.data(), b: doc.data().ref.path})})));
        await db.collection(`users/${user.uid}/items`).orderBy("date", "asc").limit(6).get().then(qs => qs.forEach(doc => db.doc(doc.data().ref.path).get().then(q => { items.push(q.data()); localStorage.setItem(q.data().id, JSON.stringify(q.data())); })));
        await db.collection(`users/${user.uid}/characters`).orderBy("date", "asc").limit(6).get().then(qs => qs.forEach(doc => db.doc(doc.data().ref.path).get().then(q => { players.push( { a: q.data(), b: doc.data().ref.path })})));
        await db.collection(`users/${user.uid}/campaigns`).orderBy("running", "asc").limit(1).get().then(qs => qs.forEach(doc => db.doc(doc.data().ref.path).get().then(q => { campaigns.push(q.data()) })));

        if(campaigns.length > 1) campaigns.pop();
        renderDOM(items, players, campaigns, user);

        // db.collection(`users/${user.uid}/campaigns`).orderBy("ref", "asc").get().then(qs => {
        //     qs.forEach(doc => {
        //         console.log(doc.data());
        //     });
        // });
    }
});

let renderDOM = (items, players, campaigns, user) => {
    ReactDOM.render(
        <div>
            <div className="header_content">
                <h1 id="title">Hello, {user.displayName}</h1>

                <Campaign props={campaigns[0]} type="small"></Campaign>

                <div className="linear gapNormal paddingNormal" style={ { width: "100%" } }>
                    <div className="vertical half1">
                        <div className="linear center space_between">
                            <h2>Recent Items</h2>
                            <a href="./list?v=items">ALL {'>'}</a>
                        </div>
                        
                        <List props={items} type="item"></List>
                    </div>

                    <div className="vertical half2">
                        <div className="linear center space_between">
                            <h2>Recent Characters</h2>
                            <a href="./list?v=characters">ALL {'>'}</a>
                        </div>
                        
                        <List props={players} type="player"></List>
                    </div>
                </div>
            </div>
        </div>
        ,document.getElementById('content')
    );
}