document.addEventListener('DOMContentLoaded', function (event) {
    calculateMeetupDates();
});

function calculateMeetupDates() {
    const currentDate = new Date();
    let switchMeetupDates = false;

    // calculate the first and third thusday of this month for Raum Liebelei and Beyerhaus
    let firstThursday = calculateFirstThursdayOfTheMonth();
    let thirdThursday = new Date(
        firstThursday.getFullYear(),
        firstThursday.getMonth(),
        firstThursday.getDate() + 14, // 14 days after the first Thursday
    );

    // if the first thusday is in the past, we need to get the next month
    if (firstThursday < currentDate) {
        firstThursday = calculateFirstThursdayOfTheMonth(
            currentDate.getMonth() + 1,
        );
        switchMeetupDates = true;
    }

    // if the third thusday is in the past, we need to get the next month
    if (thirdThursday < currentDate) {
        thirdThursday = new Date(
            firstThursday.getFullYear(),
            firstThursday.getMonth(),
            firstThursday.getDate() + 14,
        );
        switchMeetupDates = false;
    }

    // update the dates in the DOM
    printDate('#js__meetup-date--1', firstThursday);
    printDate('#js__meetup-date--2', thirdThursday);

    // switch meetup dates order
    if (switchMeetupDates) {
        const firstDateElement = document.getElementById(
            'js__meetup-element--1',
        ).innerHTML;
        const secondDateElement = document.getElementById(
            'js__meetup-element--2',
        ).innerHTML;

        document.getElementById('js__meetup-element--1').innerHTML =
            secondDateElement;
        document.getElementById('js__meetup-element--2').innerHTML =
            firstDateElement;
    }
}

function calculateFirstThursdayOfTheMonth(
    month = new Date().getMonth(),
) {
    const now = new Date();

    // get the first thursday of the month
    const firstThursday = new Date(now.getFullYear(), month, 1);
    while (firstThursday.getDay() !== 4) {
        firstThursday.setDate(firstThursday.getDate() + 1);
    }

    return firstThursday;
}

function printDate(selector, date) {
    if (!selector || !date) {
        return;
    }

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
    };

    document.querySelector(selector).innerHTML =
        date.toLocaleDateString('de-DE', options);
}
