
class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.children = [];
        this.state.props = this.state.props.props;
        this.handleManagment = this.handleManagment.bind(this)
        this.uploadItem = this.uploadItem.bind(this)
    }

    handleManagment(rarity) {
        this.forceUpdate()

        this.state.props.rarity = rarity;
        this.forceUpdate()

        this.state.children.forEach(e => {
            if(e) { 
                if(e.state.props.props !== rarity)  e.setFalse();
                else e.setTrue();   
            }
        })
    }

    handleFile() {
        $('#image_image').removeClass("hidden")
        console.log($('#drag-n-drop').prop("files"))
        $('#image_image').attr("src", window.URL.createObjectURL($('#drag-n-drop').prop("files")[0]))
    }   

    uploadItem() {
        let storageRef = firebase.storage().ref();
        let path = `/items/${$('#drag-n-drop').prop("files")[0].name}`;

        var iRef = storageRef.child(path);
        let rarity = this.state.props.rarity;

        iRef.put($('#drag-n-drop').prop("files")[0]).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => { 
                db.collection("items").add({
                    desc: $(".create_desc")[0].value,
                    enchants: [],
                    id: '000',
                    image: downloadURL,
                    name: $(".create_name")[0].value,
                    rarity: rarity,
                    type: $(".create_type")[0].value,
                    weight: parseInt($(".create_weight")[0].value)
                })
            });
        });
    }

    render() {
        let possible_rarities = ["divine", "legendary", "mythic", "epic", "rare", "uncommon", "common"];

        return (
            <div className="item_page_dynamic">
                <div className="header_content item_dynamic">
                    <div>
                        <div style={{ position: 'relative' }}>
                            <h2 style={{ color: `${(this.state.props.rarity == 'common') ?  `rgba(var(--${this.state.props.rarity}), 1)` : `rgba(var(--${this.state.props.rarity}), 0.4)`} `}}>{this.state.props.id}</h2>
                            <input className="create_type" placeholder={this.state.props.type.toUpperCase()}></input>
                        </div>

                        <input className="create_name" placeholder={this.state.props.name}></input>
                        
                        <textarea className="create_desc" placeholder={this.state.props.desc.replace(/\n/g,' ')} type="paragraph"></textarea>

                        <div className="displayNormal">
                            {
                                possible_rarities.map(e => {
                                    return (
                                        <Selectable className={`${e} boxNormal`} active={e == "uncommon"} key={e} props={e} parent={this.handleManagment} ref={b => {this.state.children.push(b)}}></Selectable>
                                    );
                                })
                            }
                        </div>

                        <input className="create_weight" placeholder="e.g. 1, in Kg (Do not include unit)"></input>

                        <input onChange={this.handleFile} className={"image "} id="drag-n-drop" type="file" src="" alt="Submit" width="200" height="200" accept=".png,.jpg,.gif,.jpeg"></input>
                        
                        <br></br>
                        <button onClick={this.uploadItem}>+ Create Item</button>
                    </div>  

                    <img className="hidden" id="image_image" src={`./assets/${this.state.props.image}`}></img>                    
                </div>

                <div className="dynamicFooter" style={{ backgroundColor: `${(this.state.props.rarity == 'common') ?  `rgba(var(--${this.state.props.rarity}), 0.4)` : `rgba(var(--${this.state.props.rarity}), 0.2)`}` }}>
                    <h3 style={{ color: `${(this.state.props.rarity == 'common') ?  `rgba(var(--${this.state.props.rarity}), 0.8)` : `rgba(var(--${this.state.props.rarity}), 0.5)`}` }}>{this.state.props.rarity.toUpperCase()}</h3>
                    
                    <div className="vertical_separator" style={{ backgroundColor: `${(this.state.props.rarity == 'common') ?  `rgba(var(--${this.state.props.rarity}), 0.6)` : `rgba(var(--${this.state.props.rarity}), 0.2)`}` }}></div>
                    
                    <h1 style={{ color: `${(this.state.props.rarity == 'common') ?  `rgba(var(--${this.state.props.rarity}), 0.6)` : `rgba(var(--${this.state.props.rarity}), 0.5)`}` }}>{this.state.props.id}</h1>
                </div>
            </div>
        );
    }
}

