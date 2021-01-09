let renderDOM = () => {
    let _page_type = _params.get("v");

    if(_page_type == "items") {
        let doc = {
            rarity: 'uncommon',
            id: '000',
            type: 'item type',
            desc: 'Describe Your Item',
            name: 'Item Name'
        }
    
        ReactDOM.render(
            <CreateItem props={doc} type={_page_type} />
            ,document.getElementById('content')
        );
    }else if(_page_type == "campaigns") {
        let doc = {
            name: 'uncommon',
            desc: '000',
            info: {
                paused: true,
                players: 1,
                year: '2021'
            }
        }
    
        ReactDOM.render(
            <CreateCampaign props={doc} type={_page_type} />
            ,document.getElementById('content')
        );
    }else if(_page_type == "class") {
        let doc = {
            name: 'Un-named',
            tree: {
                name: "Root",
                unlock_value: 0,
                unlocked: true,
                children: [
                    {
                        name: 'hey',
                        unlock_value: 0,
                        unlocked: true,
                    }
                ]
            }
        }
    
        ReactDOM.render(
            <CreateClass props={doc} type={_page_type} modalData={doc}/>
            ,document.getElementById('content')
        );
    }
}

renderDOM();