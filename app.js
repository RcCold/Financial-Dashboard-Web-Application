// Booth locations
const boothLocations = {
    'Wina1': 'Lusaka CPD',
    'Wina2': 'Libala',
    'Wina3': 'Kabwata',
    'Wina4': 'Mandevu',
    'Wina5': 'Woodlands',
    'Wina6': 'Matero East'
};

// Services and Revenue per Kwacha
const boothServices = {
    'Wina1': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045, 'Zanaco': 0.035, 'FNB': 0.04 },
    'Wina2': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045, 'FNB': 0.04 },
    'Wina3': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045, 'Zanaco': 0.035, 'FNB': 0.04 },
    'Wina4': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045 },
    'Wina5': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zanaco': 0.035, 'FNB': 0.04 },
    'Wina6': { 'Airtel Money': 0.05, 'MTN Money': 0.06, 'Zamtel Money': 0.045 }
};

// Transaction counts for each service (initially set to 0)
const transactionCounts = {
    'Airtel Money': 0,
    'MTN Money': 0,
    'Zamtel Money': 0,
    'Zanaco': 0,
    'FNB': 0
};

