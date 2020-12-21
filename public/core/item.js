(() => {
    let doc = JSON.parse(localStorage.getItem("itemLoad"));
    if(localStorage.getItem(_params.get("c")) !== undefined) {
        render(doc)
    }else {
        db.collection("items").where("id", "==", _params.get("c")).get().then(querySnapshot => {
            querySnapshot.forEach(e => {
                let doc = e.data();
                localStorage.setItem(_params.get("c"), JSON.stringify(doc));

                render(doc);
            })
        });
    }
})();

function render(doc) {
    ReactDOM.render(
        <div className="item_page_dynamic">
            <div className="header_content item_dynamic">
                <div>
                    <div style={{ position: 'relative' }}>
                        <h2 style={{ color: `rgba(var(--${doc.rarity}), 0.4)` }}>{doc.id}</h2>
                        <h3>{doc.type.toUpperCase()}</h3>
                    </div>
                    <h1>{doc.name}</h1>

                    <p>{doc.desc.replace(/\n/g,' ')}</p>

                    <button>+ Add to Character</button>
                </div>

                <img src={`${doc.image}`}></img>

                
            </div>

            <div className="dynamicFooter" style={{ backgroundColor: `rgba(var(--${doc.rarity}), 0.2)` }}>
                <h3 style={{ color: `rgba(var(--${doc.rarity}), 0.5)` }}>{doc.rarity.toUpperCase()}</h3>
                
                <div className="vertical_separator" style={{ backgroundColor: `rgba(var(--${doc.rarity}), 0.2)` }}></div>
                
                <h1 style={{ color: `rgba(var(--${doc.rarity}), 0.5)` }}>{doc.id}</h1>
            </div>
        </div>

        ,document.getElementById('content')
    ); 
}