class ClassModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.add = false;
        this.addNode = this.addNode.bind(this);
    }

    addNode() {
        this.setState({ add: true });
    }

    constructTree(tree) {  
        console.log(tree)
        if(!tree) return;    
        
        if(this.props.type == "create") {
            return (
                <li>
                    <div className="vertical center">
                        <a className={"unlockable"}>
                            {tree.name} {(tree.unlocked !== undefined && tree.unlocked) ? `` : `| ${tree.unlock_value}` }
                        </a>

                        {
                            /* <li className="mediumBorderVertical">
                                <a>+</a>
                            </li> */
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

                        <li><div><a onClick={this.addNode}>+</a></div></li>
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

    render() {
        console.log(this.props.data.tree);

        if(!this.props.data.name) return( <div></div> );

        return (
            <div className={this.props.isOpen ? 'classModal fullCenter' : 'classModal hidden'} style={{ width: '100%' }}>
                <div className="closeButton" onClick={this.props.onRequestClose}><p>&#10799;</p></div>

                <div className="modalHeader">
                    { (this.props.type !== "view-only" && this.props.type !== "create") ? <h1>{this.props.data.class.capitalize()}</h1> : (this.props.type == "create") ? <></> : <h1>{this.props.data.name.capitalize()}</h1>}
                    { (this.props.type !== "view-only" && this.props.type !== "create") ? <p>{this.props.data.points} Class Point/s</p> : ""}
                    { (this.props.type == "create") ? <input type="text" placeholder="Class Name"/> : <></> }
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
                        <div className="closeButton" onClick={this.props.onRequestClose}><p>&#10799;</p></div>
                        <h3 style={{  width: '100%', textAlign: 'center' }}>ADD NODE</h3>

                        <h4>TITLE</h4>
                        <input type="text" placeholder="Title" style={{ width: '100%' }}/>
                        <h4>UNLOCK VALUE</h4>
                        <input type="number" placeholder="0" style={{ width: '100%' }}/>

                        <button>Add Node</button>
                    </div>
                    :
                    <></>
                }
            </div>
        );
    }
}