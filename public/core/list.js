const _params = new URLSearchParams(window.location.search)
let _page_type = _params.get("v")

firebase.auth().onAuthStateChanged(user => {
    let search = (_page_type == 'characters') ? `users/${user.uid}/characters` : `items`;
    if(_page_type == 'campaigns') search = `users/${user.uid}/campaigns`;

    let dbSearch = db.collection(search);

    if(_page_type == 'items')  {
        dbSearch.orderBy("id", "asc").limit(25).get().then(qs => {
            let col = [];
        
            qs.forEach((doc, index) => {
                col.push(doc.data())

                console.log(doc.data())
        
                if(index === qs.length) {
                    renderDOM(col);
                }
            });
        });
    }else if(_page_type == 'characters') {
        dbSearch.orderBy("date", "asc").limit(25).get().then(qs => {
            let col = [];

            qs.forEach((doc, index) => {
                db.doc(doc.data().ref.path).get().then(qsi => {
                    col.push(qsi.data());

                    if(index === qs.length) {
                        renderDOM(col);
                    }
                });
            });
        });
    }else {
        dbSearch.orderBy("running", "asc").limit(25).get().then(qs => {
            let col = [];
        
            qs.forEach((doc, index) => {
                db.doc(doc.data().ref.path).get().then(qsi => {
                    col.push(qsi.data());

                    if(index === qs.length) {
                        renderDOM(col);
                    }
                });
            });
        });
    }
});

let renderDOM = (items) => {
    ReactDOM.render(
        <div>
            <div className="header_content">
                <h1 id="title" style={{ textTransform: 'capitalize' }}>{_page_type}</h1>

                <div className="search_field">
                    <input placeholder="Search"></input>
                    <a href={`./create?v=${_page_type}`}>+ Create {(_page_type == 'items' ? 'an' : 'a')} {(_page_type.capitalize().substring(0, _page_type.length - 1))}</a>
                </div>
                

                <div className="linear gapNormal paddingNormal full80">
                    <div className="vertical full">
                        <div className="linear center space_between">
                            <h2>All {_page_type.capitalize()}</h2>
                            <a href="./">DASHBOARD {'>'}</a>
                        </div>
                        
                        <List props={items} type={_page_type}></List>
                    </div>
                </div>
            </div>
        </div>
        ,document.getElementById('content')
    );
}