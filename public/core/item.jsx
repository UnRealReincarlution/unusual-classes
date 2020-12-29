(async () => {
    let doc = JSON.parse(localStorage.getItem("itemLoad"));
    const characters = [];

    if(localStorage.getItem(_params.get("c")) !== undefined) {

        db.collection(`users/${auth.getUid()}/characters`).get().then(qs => {
            qs.forEach(async e => {
                let k = await db.collection(e.data().ref.path).get();
                characters.push(k.data());
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

    firebase.auth().onAuthStateChanged(user => {
        if(!user) return;

        db.collection("users").doc(auth.currentUser.uid).collection("characters").get().then(qs => {
            console.log(qs);
    
            qs.forEach(async e => {
                let k = await db.doc(e.data().ref.path).get();
                characters.push(k);
                render(doc, characters);
            })
        });
    });
})();

let addToChar = (c) => {
   console.log(c.ref.path);

   db.collection("items").where("image", "==", JSON.parse(localStorage.getItem("itemLoad")).image).get().then(q => {
       q.forEach(e => {
            console.log(e.ref.path)

            db.doc(c.ref.path).update({
                items: firebase.firestore.FieldValue.arrayUnion(e.ref)
            });

           // Set data at **c.ref.path** [items] -> ArrayUnion to add **e.ref.path**
       });
   })
}

function render(doc, chars) {
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
                                    <div onClick={() => { if($(`[custom-attribute="${e.data().name}"]`).text() !== "✓") { addToChar(e); $(`[custom-attribute="${e.data().name}"]`).text("✓") }}}>
                                        <h3>{e.data().name}</h3>
                                        <i custom-attribute={e.data().name}>+</i>
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