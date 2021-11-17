function drop(id, d = 1000) {
    $("#" + id).show();
    $("#" + id).css("left", Math.random() * (window.innerWidth - $("#" + id).width()));
    document.getElementById(id).animate([
        { transform: 'translate3D(0, 0, 0)' },
        { transform: `translate3D(0, ${window.innerHeight}px, 0)` }
    ], {
        duration: d,
        iterations: 1
    });
    var sound_interval = setInterval(() => {
        audio_file = "audio/coin.wav";
        if ($("#" + id).hasClass("note")) {
        }
        var sound = new Audio(audio_file);
        sound.play();
        clearInterval(sound_interval);
    }, d);
}

function main() {
    let username = localStorage.username;
    let pay = parseInt(localStorage.pay);
    let payday = parseInt(localStorage.payday);
    let day_arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let kaching = 0;
    let score = 0;
    $(".money").mouseover(e => {
        audio_file = "audio/piggybank.mp3";
        if ($(e.target).hasClass("note")) audio_file = "audio/notes.mp3";
        var sound = new Audio(audio_file);
        sound.play();
        val = parseFloat($(e.target).attr("val"));
        $(e.target).hide();
        score += val;
        $("#score").text(`Piggybank: $${score.toFixed(2)}`);
    });

    window.setInterval(() => {
        const d = new Date();
        let day_of_month = d.getDate();
        let days_since_payday = day_of_month - payday;
        let greet = "Good morning";
        if (d.getHours() >= 12) greet = "Good afternoon";
        if (d.getHours() >= 18) greet = "お疲れ様でした..なぜまだここにいる？帰てください!";
        let pay_rate = pay / (22 * 9.5 * 60 * 60);
        $("#greeting").text(`${greet}, ${username}.`);
        // $("#day-message").text(`It is currently a ${day_arr[day]}.`);
        // $("#time").text(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
        let kaching_old = kaching.toString();
        kaching = (pay_rate * (((days_since_payday - 1) * 9.5 * 60 * 60) + ((d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds()) - (8 * 60 * 60 + 30 * 60)))).toFixed(2);
        $("#kaching").text(`$${kaching}`);
        console.log(kaching_old);
        if (kaching.slice(-1) != kaching_old.slice(-1)) {
            drop("coin-1c");
            if (parseInt(kaching.slice(-1)) % 5 == 0) drop("coin-5c", 1200);
        }
        if (kaching_old.slice(-2, -1) != kaching.slice(-2, -1)) {
            drop("coin-10c", 1400);
            if (parseInt(kaching.slice(-2, -1)) % 2 == 0) drop("coin-20c", 1600);
            if (parseInt(kaching.slice(-2, -1)) % 5 == 0) drop("coin-50c", 1800);
        }
        if (kaching_old.slice(-4, -3) != kaching.slice(-4, -3)) {
            drop("coin-1d", 2000);
            if (parseInt(kaching.slice(-4, -3)) % 2 == 0) drop("note-2d", 2200);
            if (parseInt(kaching.slice(-4, -3)) % 5 == 0) drop("note-5d", 2400);
        }
        if (kaching_old.slice(-5, -4) != kaching.slice(-5, -4)) {
            drop("note-10d", 2600);
            if (parseInt(kaching.slice(-5, -4)) % 5 == 0) drop("note-50d", 2600);
        }
        if (kaching_old.slice(-6, -5) != kaching.slice(-6, -5)) {
            drop("note-100d", 2800);
        }
        if (kaching_old.slice(-7, -6) != kaching.slice(-7, -6)) {
            drop("note-1000d", 3000);
        }
    }, 1000);
}

// Register particulars form submit listener
const particularsForm = document.getElementById('particulars-form');
particularsForm.addEventListener('submit', e => {
    e.preventDefault();

    let input_username = particularsForm.querySelector('input[name=name]');
    let input_pay = particularsForm.querySelector('input[name=pay]');
    let input_payday = particularsForm.querySelector('input[name=payday]');

    localStorage.username = input_username.value;
    localStorage.pay = input_pay.value;
    localStorage.payday = input_payday.value;

    // Close the form
    const overlay = document.querySelector('#particulars-overlay');
    overlay.style.display = 'none';

    // Call main function
    main();
});

if (localStorage.username && localStorage.pay && localStorage.payday) {
    // Hide particulars form overlay
    const overlay = document.querySelector('#particulars-overlay');
    overlay.style.display = 'none';
    main();
}
