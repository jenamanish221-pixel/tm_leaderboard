const supabaseUrl = 'https://ocpjersnydfktqpmgnvi.supabase.co';
const supabaseKey = 'sb_publishable_8xzs5pQ7iS5T8u8f_fshVw_jq7XEbDz';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 1. Function to send data to the database
async function submitTime() {
    const name = document.getElementById('playerName').value;
    const map = document.getElementById('mapName').value;
    const time = document.getElementById('finishTime').value;

    const { data, error } = await supabase
        .from('leaderboard')
        .insert([{ player_name: name, map_name: map, seconds: parseFloat(time) }]);

    if (error) console.error(error);
    else location.reload(); // Refresh to show new time
}

// 2. Function to fetch and show the leaderboard
async function loadLeaderboard() {
    const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('seconds', { ascending: true }); // Fastest time first!

    const tableBody = document.getElementById('leaderboardBody');
    data.forEach((entry, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.player_name}</td>
                <td>${entry.map_name}</td>
                <td>${entry.seconds.toFixed(3)}s</td>
            </tr>
        `;
    });
}

loadLeaderboard();