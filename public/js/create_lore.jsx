let quill;
let lastDebounce = new Date();

class LoreCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };

        this.setState({ synced: true })

        this.publishLore = this.publishLore.bind(this);
        this.debounceLore = this.debounceLore.bind(this);
    }

    publishLore() {
        db.doc(`${localStorage.getItem("lore")}/lore/${this.state.docId}`).update({ 
            title: $("#title").val(),
            body: quill.root.innerHTML,
            type: 'published'
        });
    }

    updateLore() {
        this.setState({ synced: false });
        lastDebounce = new Date();

        setTimeout(this.debounceLore, 2500);
    }

    debounceLore() {
        if(new Date() - lastDebounce > 2500) {
            db.doc(localStorage.getItem("editing_lore")).update({ 
                body: quill.root.innerHTML, 
                title: $("#title").val() 
            });

            this.setState({ synced: true });
        }
    }

    createLore(user) {
        let loc = `${localStorage.getItem("lore")}/lore`;

        console.log(loc);

        db.collection(loc).add({
            title: "N/A",
            body: "",
            author: user.uid,
            type: 'draft'
        }).then(e => {
            this.setState({ docId: e.id });
            localStorage.setItem("editing_lore", `${localStorage.getItem("lore")}/lore/${e.id}`);
        })
    }

    loadLore(user) {
        let loc = localStorage.getItem("editing_lore");

        db.doc(loc).get().then(e => {
            console.log(e);

            this.setState({ docId: e.id, synced: true });
            
            $("#title").val(e.data().title);
            quill.root.innerHTML = e.data().body;
        })
    }

    render() {
        return (
            <div className="item_page_dynamic header_content">
                <h1>Create Lore</h1>

                <div id="input">
                    <h2>Title</h2>
                    <input type="text" style={ { width: '100%' } } id="title"></input>

                    <h2>Body</h2>
                    <div id="editor"></div>

                    <div className="linear marginLess" style={ { justifyContent: 'space-between', padding: '15px' } }>
                        <button onClick={this.publishLore}>Publish</button>

                        <div className={(this.state.synced) ? "linear center marginLess syncStatus synced" : "linear center marginLess syncStatus not_synced"}>
                            <div className={(this.state.synced) ? "connected" : "not_connected"}></div>
                            <h3 style={{ letterSpacing: 'normal' }}>{(this.state.synced) ? "SYNCED" : "NOT SYNCED"}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        var toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'align': [] }],

            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
            ['link', 'image']
        ];

        quill = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

        firebase.auth().onAuthStateChanged(user => {
            if(window.performance.navigation.type == 1) {
                this.loadLore(user);
            }else if(!this.props.edit && user) this.createLore(user);
        });
        
        quill.on('text-change', (e, oe, sc) => {
            this.updateLore(e);
        })
    }
}

ReactDOM.render(<LoreCreate edit={false}/>, document.getElementById("content"))