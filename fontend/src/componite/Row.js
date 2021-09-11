const Row = ({ stock, quantity, value, id, oddeven, setStockSelected, noRadio, stockSelected }) => {
    const Radio = ({ id, setStockSelected, checked }) => {

        return (
            <input type="radio" name="a" value={id} checked={checked} onChange={() => setStockSelected(stock) } />
        )
    }

    let className;
    if (oddeven == null) {
        className = "gridItem gh";
    } else if (oddeven % 2 === 0) {
        className = "gridItem gridEven"
    } else {
        className = "gridItem gridOdd"
    }
    return (
        <>
            <span className={className}>{stock}</span>
            <span className={className}>{quantity}</span>
            <span className={className}>{value}</span>
            <span className={className}>
                {noRadio === false  ? <Radio setStockSelected={setStockSelected} id={id} checked={(stockSelected === stock)} /> : noRadio}
            </span>
        </>
    )
}
Row.defaultProps = {
    stock: 'Stock',
    quantity: 'Quantity',
    value: 'Value'
}
export default Row;
/*This is what the Head should show.
                    <span className="gridItem gh">Stock</span>
                    <span className="gridItem gh">Quantity</span>
                    <span className="gridItem gh">Value</span>
                    <span className="gridItem gh">Buy/Sell</span>
*/