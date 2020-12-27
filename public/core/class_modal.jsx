class ClassModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
    }

    constructTree(tree) {
        console.log("TREE: ", tree);

        if(!tree) return <div>+</div>;

        return (
            <div>
                <h2>{tree.name} = {tree.unlock_value}</h2>
                { 
                    (tree.children && tree.children.length > 0) 
                    ?
                    tree.children.map((e) => { 
                        return ( this.constructTree(e) )
                    }) 
                    :
                    (tree.children[0] == "") ? "+" : ""
                }
            </div>
        )
    }

    render() {
        return (
            <div className={this.props.isOpen ? 'classModal' : 'classModal hidden'}>
                <div className="closeButton" onClick={this.props.onRequestClose}><p>&#10799;</p></div>

                <div className="modalHeader">
                    <h1>{this.props.data.class.capitalize()}</h1>
                    <p>{this.props.data.points} Point/s</p>
                </div>
                
                <div className="modalBody">
                    {
                        this.constructTree(this.props.tree)
                    }
                </div>
            </div>
        );
    }
};
