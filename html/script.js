const App = () => {
    const [items, setItems] = React.useState([]);
    const [zone, setZone] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('all');
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.action === 'open') {
                setItems(event.data.items);
                setZone(event.data.zone);
                setVisible(true);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('message', handleMessage);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleClose = () => {
        setVisible(false);
        setSearch('');
        setCategory('all');
        fetch(`https://esx_shops/close`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({}),
        });
    };

    const handleBuy = (item, amount) => {
        fetch(`https://esx_shops/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ item: item.name, amount: amount, zone: zone }),
        });
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || (item.category && item.category === category);
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', ...new Set(items.map(item => item.category).filter(Boolean))];

    if (!visible) {
        return null;
    }

    return (
        <div id="root" style={{ display: 'block' }}>
            <div className="shop-container">
                <div className="header">
                    <h1>{zone ? zone.replace(/([A-Z])/g, ' $1').trim() : 'Shop'}</h1>
                    <button className="close-btn" onClick={handleClose}>&times;</button>
                </div>

                <div className="controls">
                    <div className="search-bar-container">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Search for items..."
                            className="search-bar"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="categories">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-btn ${category === cat ? 'active' : ''}`}
                                onClick={() => setCategory(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="items-table-container">
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th className="action-cell">Quantity & Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => (
                                <tr key={item.name}>
                                    <td>{item.label}</td>
                                    <td>${item.price.toLocaleString()}</td>
                                    <td className="action-cell">
                                        <input className="quantity-input" type="number" min="1" defaultValue="1" />
                                        <button className="buy-btn" onClick={(e) => handleBuy(item, e.target.previousElementSibling.value)}>BUY</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root-container'));
