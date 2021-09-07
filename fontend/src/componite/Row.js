const Row = ({ stock, quantity, value, id, oddeven, setRadioSelected, noRadio }) => {
    const Radio = ({ id, setRadioSelected }) => {

        return (
            <input type="radio" name="a" value={id} onChange={() => setRadioSelected(stock)} />
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
                {noRadio === false  ? <Radio setRadioSelected={setRadioSelected} id={id} /> : noRadio}
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