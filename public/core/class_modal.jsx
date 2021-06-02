class ClassModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.add = false;
        this.addNode = this.addNode.bind(this);
        this.createClass = this.createClass.bind(this);
    }

    addNode(tree) {
        console.log(tree);
        this.setState({ add: !this.state.add });
    }

    bindNode() {

    }

    updateTitle(e) {
        this.props.data.tree.name = e.target.value;
        this.props.data.name = e.target.value;

        this.forceUpdate();
    }

<<<<<<< Updated upstream
    constructTree(tree) {  
        console.log(tree)
=======
    constructTree(tree) {
>>>>>>> Stashed changes
        if(!tree) return;    
        
        if(this.props.type == "create") {
            return (
                <li>
                    <div className="vertical center">
                        <a className={"unlockable"}>
                            {tree.name} {(tree.unlocked !== undefined && tree.unlocked) ? `` : `| ${tree.unlock_value}` }
                        </a>

                        {
<<<<<<< Updated upstream
                            /* <li className="mediumBorderVertical">
                                <a>+</a>
                            </li> */
=======
                            (!tree.children) ?
                            <li className="mediumBorderVertical">
                                <a onClick={() => this.addNode(tree)}>+</a>
                            </li>
                            :
                            <></>
>>>>>>> Stashed changes
                        }
                    </div>
                    
                    { 
                        (tree.children !== undefined && tree.children.length > 0) 
                        ? (
                        <ul className={(tree.unlocked !== undefined && tree.unlocked) ? "unlocked" : "unlockable"}>
                        {
                            tree.children.map((e) => { 
                                return ( this.constructTree(e)  )
                            }) 
                        }

                        <li><div><a onClick={() => this.addNode(tree)}>+</a></div></li>
                        </ul>)
                        :
                        ""
                    }  
                </li>
            )
        }else if(this.props.type !== "view-only") {
            return (
                <li className={(tree.unlocked !== undefined && tree.unlocked) ? "unlocked" : ""}>
                    <a className={((this.props.data.points < tree.unlock_value) ? "locked" : "unlockable") + " " + ((tree.unlocked !== undefined && tree.unlocked) ? "unlocked" : "")}>
                        {tree.name} {(tree.unlocked !== undefined && tree.unlocked) ? `` : `| ${tree.unlock_value}` }
                    </a>
                    
                    { 
                        (tree.children !== undefined && tree.children.length > 0) 
                        ? (
                        <ul className={(tree.unlocked !== undefined && tree.unlocked) ? "unlocked" : "unlockable"}>
                        {
                            tree.children.map((e) => { 
                                return ( this.constructTree(e)  )
                            }) 
                        }
                        </ul>)
                        :
                        ""
                    }  
                </li>
            )
        }else {
            return (
                <li>
                    <a className={"unlockable"}>
                        {tree.name} {(tree.unlocked !== undefined && tree.unlocked) ? `` : `| ${tree.unlock_value}` }
                    </a>
                    
                    { 
                        (tree.children !== undefined && tree.children.length > 0) 
                        ? (
                        <ul className={(tree.unlocked !== undefined && tree.unlocked) ? "unlocked" : "unlockable"}>
                        {
                            tree.children.map((e) => { 
                                return ( this.constructTree(e)  )
                            }) 
                        }
                        </ul>)
                        :
                        ""
                    }  
                </li>
            )
        }
    }

    createClass(e) {
        var classCreation = {
            title: this.props.data.name,
            tree: this.props.data.tree
        }

        db.collection(`campaigns/${campaign}/classes`).add(classCreation).then(e => {
            console.log(e);
        });
    }

    render() {
        if(!this.props.data.name) return( <div></div> );

        return (
            <div className={this.props.isOpen ? 'classModal fullCenter' : 'classModal hidden'} style={{ width: '100%' }}>
                <div className="closeButton" onClick={this.props.onRequestClose}><p>&#10799;</p></div>

                <div className="modalHeader">
                    { (this.props.type !== "view-only" && this.props.type !== "create") ? <h1>{this.props.data.class.capitalize()}</h1> : (this.props.type == "create") ? <></> : <h1>{this.props.data.name.capitalize()}</h1>}
                    { (this.props.type !== "view-only" && this.props.type !== "create") ? <p>{this.props.data.points} Class Point/s</p> : ""}
                    { (this.props.type == "create") ? <input type="text" placeholder="Class Name" onChange={(e) => this.updateTitle(e)}/> : <></> }
                    { (this.props.type == "create") ? <button onClick={(e) => this.createClass(e)} className="noMargin">Create</button> : <></> }
                </div>
                
                <div className="modalBody">
                    <nav className="nav">
                        <ul>
                            {
                                (this.props.type !== "view-only" && this.props.type !== "create")
                                ?
                                this.constructTree(this.props.tree)
                                :
                                this.constructTree(this.props.data.tree)
                            }
                        </ul>            
                    </nav>
                </div>

                {
                    (this.state.add)
                    ?
                    <div className="modalOverlay">
                        <div className="closeButton" onClick={this.addNode}><p>&#10799;</p></div>
                        <h3 style={{  width: '100%', textAlign: 'center' }}>ADD NODE</h3>

                        <h4>TITLE</h4>
                        <input type="text" placeholder="Title" style={{ width: '100%' }}/>
                        <h4>UNLOCK VALUE</h4>
                        <input type="number" placeholder="0" style={{ width: '100%' }}/>

                        <button onClick={this.bindNode}>Add Node</button>
                    </div>
                    :
                    <></>
                }
            </div>
        );
    }
}