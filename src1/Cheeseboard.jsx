export default function Cheeseboard() {
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return (
        <>
            <td></td>
            {
                letters.map((argument) => (
                        <td >{argument}</td>
                    )
                )
            }
            <td></td>
        </>
    )
}