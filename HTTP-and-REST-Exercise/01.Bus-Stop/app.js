function getInfo() {
    const busStopId = document.getElementById('stopId').value
    const busStopName = document.getElementById('stopName')
    const output = document.getElementById('buses')
    output.textContent = ''
    
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStopId}`)
        .then((res) => res.json())
        .then((busInfo) => {
            const { name, buses } = busInfo;
            busStopName.textContent = name;
            for (const busNum in buses) {
                const li = document.createElement('li')
                li.textContent = `Bus ${busNum} arrives in ${buses[busNum]} minutes`
                output.appendChild(li)
            }
        })
        .catch((err) => {
            busStopName.textContent = 'Error'
        })
}