import React, { useEffect, useState } from "react";

(async () => {
    let doc = JSON.parse(localStorage.getItem("itemLoad"));
    const characters = useState([]);

    if(localStorage.getItem(_params.get("c")) !== undefined) {

        db.collection(`users/${auth.getUid()}/characters`).get().then(qs => {
            qs.forEach(async e => {
                let k = await db.collection(e.data().ref.path).get();
                characters.push(k);
            })
        });

        render(doc, characters)
    }else {
        db.collection("items").where("id", "==", _params.get("c")).get().then(querySnapshot => {
            querySnapshot.forEach(e => {
                let doc = e.data();
                localStorage.setItem(_params.get("c"), JSON.stringify(doc));

                render(doc, characters);
            })
        });
    }

    db.collection(`users/${auth.getUid()}/characters`).get().then(qs => {
        qs.forEach(async e => {
            let k = await db.collection(e.data().ref.path).get();
            setCharacters(characters.push(e.data()));
        })
    });

    useEffect(() => {
        render(doc, characters);
    });
})();

let addToChar = (character) => {
    alert("Underlord Lindon 4 the win")
}

function render(doc, chars) {
    console.log(chars);

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

                    <button onClick={() => { $("#add_to_character").toggle(); }}>+ Add to Character</button>
                </div>

                <img src={`${doc.image}`}></img>

                <div id="add_to_character" style={ { backgroundColor: `rgba(var(--${doc.rarity}), 0.4)`} }>
                    {/* <h3 style={{ textTransform: 'uppercase', fontWeight: '800' }}>Choose character</h3> */}

                    <div>
                        {
                            chars.map(e => {
                                return (
                                    <div onClick={() => { addToChar(e) }}>
                                        <h3>{e.name}</h3>
                                        <i>+</i>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="dynamicFooter" style={{ backgroundColor: `rgba(var(--${doc.rarity}), 0.2)` }}>
                <h3 style={{ color: `rgba(var(--${doc.rarity}), 0.5)` }}>{doc.rarity.toUpperCase()}</h3>
                
                <div className="vertical_separator" style={{ backgroundColor: `rgba(var(--${doc.rarity}), 0.2)` }}></div>
                
                <h1 style={{ color: `rgba(var(--${doc.rarity}), 0.5)` }}>{doc.id}</h1>
            </div>
        </div>

        ,document.getElementById('content')
    ); 

    $("#add_to_character").hide();
}