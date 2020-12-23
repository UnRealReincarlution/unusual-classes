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

    let map = [];
    for (const [key, value] of Object.entries(doc.stats)) {
        map.push({
            a: key,
            b: value
        })
    }
    

    ReactDOM.render(
        <div className="item_page_dynamic">
            <div className="header_content item_dynamic height50">
                <div className="lel vertical center box marginLess height50 gap15 item_dynamic">
                    <h1 style={ { fontSize: '4em', margin: '0' } } >{doc.name}</h1>

                    <div className="item_dynamic linear width100" style={{ padding: '0px', width: '80%', fontWeight: '400' }}>
                        <h3 style={{ fontWeight: '400' }}>Level {doc.level}</h3>
                        <h3 style={{ fontWeight: '400' }}>{doc.exp} / 1000 XP</h3> 
                    </div>
                </div>
                

                <div className="linear center box marginLess height50 gap15 item_dynamic lel">
                    <div className="lightChildren item_dynamic vertical center jcenter marginLess health">
                        <h3 style={ { fontSize: '2em', fontWeight: '800' } }>150</h3>
                        <h4>250</h4>
                    </div>

                    <div className="item_dynamic vertical center gap15" style={ { padding: '0px 55px 0px 25px', gap: '5px', marginRight: '15px' } }>
                        <h4 className="documentOutlineSlight" style={ { backgroundColor: 'rgba(108, 206, 74 , 0.2)', color: 'rgba(108, 206, 74, 0.8)' } }>Heal</h4>
                        <input className="documentOutlineSlight" type="number" style={ { backgroundColor: 'rgba(215, 223, 213, 0.2)', color: 'rgba(100, 100, 100, 0.8)', border: 'none', width: '100%' } } placeholder="10"></input>
                        <h4 className="documentOutlineSlight">Damage</h4>
                    </div>

                    {
                        map.map(d => {
                            return (
                                <div className="primaryStat" style={ {textAlign: 'center', padding: '5px'} }>
                                    <h4 style={ {fontSize: '2em'} }>{d.b}</h4>
                                    <h5 style={ {textTransform: 'uppercase', fontWeight: '400', letterSpacing: '1px'} }>{d.a}</h5>
                                </div>
                            );
                        })
                    }

                    
                </div>
            </div>
            
            <div>
                <h3>CLASS</h3>
                <h3 className="documentOutlineSlight" style={{ width: 'fit-content' }}>{doc.class.toUpperCase()}</h3>
                {/* <h4>{doc.points} Points</h4>
                <button>Class Tree</button> */}
            </div>
        </div>

        ,document.getElementById('content')
    ); 
}