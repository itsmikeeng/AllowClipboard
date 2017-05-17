// Saves options to chrome.storage
function save_options() {
    var disablePrompt = document.getElementById('prompt').checked;
    chrome.storage.sync.set({
        disablePrompt: disablePrompt,
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        disablePrompt: false,
    }, function (items) {
        document.getElementById('prompt').checked = items.disablePrompt;
    });
}

function clearHostnames() {
    chrome.storage.sync.remove("allowedSites", function () { });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clearAllowedSites').addEventListener('click', clearHostnames);
