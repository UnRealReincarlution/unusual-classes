(() => {
    let doc = localStorage.getItem("renderCharacter");

    if(_params.get("renderCharacter") !== undefined) {
        db.doc(doc).get().then(dc => {
            let doc = dc.data();
            render(doc);
        });
    }
})();

function render(doc) {
    console.log(doc);

    ReactDOM.render(
        <div className="item_page_dynamic">
            <div className="header_content item_dynamic">
                <h1>{doc.name}</h1>

                <div className="linear center">
                    <h3>{doc.class.toUpperCase()}</h3>
                    <h3>{doc.points}</h3>
                    <button>Class Tree</button>
                </div>
                
                
            </div>

            {/* <div className="dynamicFooter" style={{ backgroundColor: `rgba(var(--${doc.rarity}), 0.2)` }}>
                <h3 style={{ color: `rgba(var(--${doc.rarity}), 0.5)` }}>{doc.rarity.toUpperCase()}</h3>
                
                <div className="vertical_separator" style={{ backgroundColor: `rgba(var(--${doc.rarity}), 0.2)` }}></div>
                
                <h1 style={{ color: `rgba(var(--${doc.rarity}), 0.5)` }}>{doc.id}</h1>
            </div> */}
        </div>

        ,document.getElementById('content')
    ); 
}