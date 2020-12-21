let renderDOM = () => {
    let _page_type = _params.get("v");

    let doc = {
        rarity: 'uncommon',
        id: '000',
        type: 'item type',
        desc: 'Describe Your Item',
        name: 'Item Name'
    }

    ReactDOM.render(
        <Create props={doc} type={_page_type}></Create>
        ,document.getElementById('content')
    );
}

renderDOM();