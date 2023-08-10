function solve() {
    const info = document.querySelector('#info .info')
    const departBtn = document.getElementById("depart")
    const arriveBtn = document.getElementById('arrive')
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/'
    let busStopInfo = {
        name: "",
        next: "depot"
    }

    function depart() {
        fetch(`${BASE_URL}${busStopInfo.next}`)
            .then((res) => res.json())
            .then((busInfo) => {
                busStopInfo = busInfo
                info.textContent = `Next stop ${busStopInfo.name}`
                departBtn.disabled = true
                arriveBtn.disabled = false
            })
            .catch(() => {
                departBtn.disabled = true
                arriveBtn.disabled = true,
                info.textContent = 'Error'
            })
    }

    async function arrive() {
        departBtn.disabled = false
        arriveBtn.disabled = true
        info.textContent = `Arriving at ${busStopInfo.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();