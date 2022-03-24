type history_element = {
    date:string, time:string, title:string, link:string,
};

// if ( window.location.href.startsWith("chrome-extension://") ) {

    let history_arr: history_element[] = [];

    // getHistory();

    // console.log("Sending content script to app");
    // chrome.runtime.sendMessage({from: "content-script", type: "SendHistory", history: "hello!"}, function response(response) {
    //     console.log("Received response from app");
    //     console.log(response);
    // });


// Listen for messages from the app
//     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         // First, validate the message's structure.
//         if ((message.from === "app") && (message.type === "GetHistory")) {
//             sendResponse({history: history_arr});
//         }
//     });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // First, validate the message's structure.
        if ((message.from === "app") && (message.type === "GetHistory")) {
            console.log("Content script received message from app");
            sendResponse({history: history_arr });
        }
    });

    console.log("Content script requesting history");
    chrome.runtime.sendMessage({from: "content-script", type: "GetHistory"}, function (response) {
        if (response) {
            history_arr = response.history;
            console.log("Content script got history from service worker:");
            console.log(response.history);
        }
    });

// }