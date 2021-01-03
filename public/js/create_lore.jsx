class LoreCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
    }

    render() {
        return (
            <div className="item_page_dynamic header_content">
                <h1>Create Lore</h1>

                <div id="input">
                    <h2>Title</h2>
                    <input type="text" style={ { width: '100%' } }></input>

                    <h2>Body</h2>
                    <div id="editor"></div>

                    <button>Publish</button>
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

        const quill = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

        console.log(quill);
        
    }
}



ReactDOM.render(<LoreCreate/>, document.getElementById("content"))