const App = () => {
    const [items, setItems] = React.useState([]);
    const [zone, setZone] = React.useState(null);

    React.useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.action === 'open') {
                setItems(event.data.items);
                setZone(event.data.zone);
                document.getElementById('root').style.display = 'block';
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleClose = () => {
        setItems([]);
        setZone(null);
        document.getElementById('root').style.display = 'none';
        fetch(`https://esx_shops/close`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({}),
        });
    };

    const handleBuy = (item, amount) => {
        fetch(`https://esx_shops/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ item: item.name, amount: amount, zone: zone }),
        });
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="shop-container">
            <div className="header">
                <h1>Shop</h1>
                <button className="close-btn" onClick={handleClose}>Close</button>
            </div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.name}>
                            <td>{item.label}</td>
                            <td>${item.price}</td>
                            <td>
                                <input className="quantity-input" type="number" min="1" defaultValue="1" />
                                <button className="buy-btn" onClick={(e) => handleBuy(item, e.target.previousSibling.value)}>Buy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
