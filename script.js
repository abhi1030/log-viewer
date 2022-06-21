
var allLogs = [];
var filteredLogs = [];
var logCount = 0;
var page = 0;
var pageCount = 0;
var logPerPage = 20;
var filterTime = 0;
var lastSearchKeys = {};

const logFile = document.getElementById('log-file');
const resetBtn = document.getElementById('reset-btn');
const loadPercent = document.getElementById('load-percent');
const logs = document.getElementById('logs');
const prevLog = document.getElementById('prev-log');
const nextLog = document.getElementById('next-log');
const logPage = document.getElementById('log-page');
const searchMessage = document.getElementById('search-message');
const searchContext = document.getElementById('search-context');
const searchLevel = document.getElementById('search-level');
const searchLevelName = document.getElementById('search-level_name');
const searchChannel = document.getElementById('search-channel');
const searchRecordDatetime = document.getElementById('search-record_datetime');
const searchRemoteAddr = document.getElementById('search-remote_addr');
const searchUserAgent = document.getElementById('search-user_agent');
const searchCreatedAt = document.getElementById('search-created_at');
const searchFormatted = document.getElementById('search-formatted');
const filteredPages = document.querySelector('#log-pages i');
const filteredcount = document.querySelector('#log-count i');

window.onload = function() {
    // Event listener for file select
    logFile.addEventListener('change', function() {
        resetBtn.removeAttribute('disabled');
        showLoader();
        resetLogs();
        for(const file of logFile.files) {
            readFile(file);
        }
    });

    // Event listener for load logs
    resetBtn.addEventListener('click', function() {
        showLoader();
        resetLogs();
        for(const file of logFile.files) {
            readFile(file);
        }
    });

    // Even listener for prevous page
    prevLog.addEventListener('click', function() {
        if(page > 0) {
            page--;
            renderTable();
        }
    });

    // Even listener for next page
    nextLog.addEventListener('click', function() {
        if(page < pageCount) {
            page++;
            renderTable();
        }
    });
    
    // Event listener for page change
    logPage.addEventListener('change', pageChangeListener);
    logPage.addEventListener('keyup', pageChangeListener);

    // Event listener for search message filter
    searchMessage.addEventListener('change', searchFilterListener);
    searchMessage.addEventListener('keyup', searchFilterListener);

    // Event listener for search context filter
    searchContext.addEventListener('change', searchFilterListener);
    searchContext.addEventListener('keyup', searchFilterListener);

    // Event listener for search level filter
    searchLevel.addEventListener('change', searchFilterListener);
    searchLevel.addEventListener('keyup', searchFilterListener);

    // Event listener for search level name filter
    searchLevelName.addEventListener('change', searchFilterListener);
    searchLevelName.addEventListener('keyup', searchFilterListener);

    // Event listener for search channel filter
    searchChannel.addEventListener('change', searchFilterListener);
    searchChannel.addEventListener('keyup', searchFilterListener);

    // Event listener for search record datetime filter
    searchRecordDatetime.addEventListener('change', searchFilterListener);
    searchRecordDatetime.addEventListener('keyup', searchFilterListener);

    // Event listener for search remote address filter
    searchRemoteAddr.addEventListener('change', searchFilterListener);
    searchRemoteAddr.addEventListener('keyup', searchFilterListener);

    // Event listener for search user agent filter
    searchUserAgent.addEventListener('change', searchFilterListener);
    searchUserAgent.addEventListener('keyup', searchFilterListener);

    // Event listener for search created_at filter
    searchCreatedAt.addEventListener('change', searchFilterListener);
    searchCreatedAt.addEventListener('keyup', searchFilterListener);

    // Event listener for search formatted filter
    searchFormatted.addEventListener('change', searchFilterListener);
    searchFormatted.addEventListener('keyup', searchFilterListener);
}

// File reader
function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const result = event.target.result;
        allLogs = result.split("\n\n");
        allLogs.forEach(log => {
            let logColumns = log.split('^');
            if(logColumns.length == 10) {
                filteredLogs.push(logColumns);
            }
        });
        allLogs = filteredLogs;
        renderTable();
        enableSearchFilter();
    });
  
    reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
            const percent = Math.round((event.loaded / event.total) * 100);
            const loadPercent = document.getElementById('load-percent');
            loadPercent.innerText = percent + '%';
        }
    });
    reader.readAsText(file);
}

// Render logs table
function renderTable() {
    logCount = filteredLogs.length;
    pageCount = Math.ceil(logCount/logPerPage);
    logPage.value = page + 1;
    filteredPages.innerText = pageCount;
    filteredcount.innerText = logCount;

    // Hiding the loader
    hideLoader();

    for(
        var x = page * logPerPage;
        x < logCount && x < (page + 1) * logPerPage;
        x++
    ) {
        let logRow = document.createElement('tr');
        logRow.innerHTML = `
        <tr>
            <td>${filteredLogs[x][0]}</td>
            <td>${filteredLogs[x][1]}</td>
            <td>${filteredLogs[x][2]}</td>
            <td>${filteredLogs[x][3]}</td>
            <td>${filteredLogs[x][4]}</td>
            <td>${filteredLogs[x][5]}</td>
            <td>${filteredLogs[x][6]}</td>
            <td>${filteredLogs[x][7]}</td>
            <td>${filteredLogs[x][8]}</td>
            <td>${filteredLogs[x][9]}</td>
        </tr>
        `;
        logs.append(logRow);
    }
}

// Show loader
function showLoader() {
    logs.innerHTML = ` 
    <div class="log-loader" id="loader">
        <img src="./loader.gif" alt="Loading...">
        <span class="load-percent" id="load-percent"></span>
    </div>
    `;
}

// Hide loader
function hideLoader() {
    logs.innerHTML = '';
    if(page > 0) {
        prevLog.removeAttribute('disabled');
    } else {
        prevLog.setAttribute('disabled', true);
    }
    if(page < pageCount - 1) {
        nextLog.removeAttribute('disabled');
    } else {
        nextLog.setAttribute('disabled', true);
    }
    if(pageCount != 1) {
        logPage.removeAttribute('disabled');
        logPage.setAttribute('max', pageCount);
    } else {
        logPage.setAttribute('disabled', true);
    }
}

// Rest logs
function resetLogs() {
    disableSearchFilters();
    page = 0;
    allLogs = [];
    filteredLogs = [];
    lastSearchKeys = {};
    searchMessage.value = '';
    searchContext.value = '';
    searchLevel.value = '';
    searchLevelName.value = '';
    searchChannel.value = '';
    searchRecordDatetime.value = '';
    searchRemoteAddr.value = '';
    searchUserAgent.value = '';
    searchCreatedAt.value = '';
    searchFormatted.value = '';
}

// Page change event listener function
function pageChangeListener(event) {
    let selectedPage = event.target.value;
    let currentPage = page;
    if(selectedPage > 0 && selectedPage <= pageCount) {
        page = selectedPage - 1;
    } else if(selectedPage <= 0) {
        page = 0;
    } else if(selectedPage > pageCount) {
        page = pageCount - 1;
    } else {
        page = 1;
    }

    if(page != currentPage) {
        renderTable();
    } else {
        event.target.value = page + 1;
    }
}

// Enable search filters
function enableSearchFilter() {
    searchMessage.removeAttribute('disabled');
    searchContext.removeAttribute('disabled');
    searchLevel.removeAttribute('disabled');
    searchLevelName.removeAttribute('disabled');
    searchChannel.removeAttribute('disabled');
    searchRecordDatetime.removeAttribute('disabled');
    searchRemoteAddr.removeAttribute('disabled');
    searchUserAgent.removeAttribute('disabled');
    searchCreatedAt.removeAttribute('disabled');
    searchFormatted.removeAttribute('disabled');
}

// Disable search filters
function disableSearchFilters() {
    searchMessage.setAttribute('disabled', true);
    searchContext.setAttribute('disabled', true);
    searchLevel.setAttribute('disabled', true);
    searchLevelName.setAttribute('disabled', true);
    searchChannel.setAttribute('disabled', true);
    searchRecordDatetime.setAttribute('disabled', true);
    searchRemoteAddr.setAttribute('disabled', true);
    searchUserAgent.setAttribute('disabled', true);
    searchCreatedAt.setAttribute('disabled', true);
    searchFormatted.setAttribute('disabled', true);
}

// Search Filter event listener function
function searchFilterListener(event) {
    let filterName = event.target.id;
    let searchKeyword = event.target.value;
        
    if(
        typeof lastSearchKeys[filterName] == undefined ||
        lastSearchKeys[filterName] != searchKeyword
    ) {
        let triggerTime = Date.now();
        lastSearchKeys[filterName] = searchKeyword;
        filterTime = triggerTime;
        showLoader();
        setTimeout(filterLogs, 1500, triggerTime);
    }
}

// Filter logs
function filterLogs(triggerTime) {
    if(filterTime == triggerTime) {
        filteredLogs = allLogs;        
        page = 0;
        hideLoader();

        // Search filter message column
        if(searchMessage.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[0].includes(searchMessage.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter context column
        if(searchContext.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[1].includes(searchContext.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter level column
        if(searchLevel.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[2].includes(searchLevel.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter level name column
        if(searchLevelName.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[3].includes(searchLevelName.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter channel column
        if(searchChannel.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[4].includes(searchChannel.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter record datetime column
        if(searchRecordDatetime.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[5].includes(searchRecordDatetime.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter remote address column
        if(searchRemoteAddr.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[6].includes(searchRemoteAddr.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter user agent column
        if(searchUserAgent.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[7].includes(searchUserAgent.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter created at column
        if(searchCreatedAt.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[8].includes(searchCreatedAt.value)) {
                    return true;
                }
                return false;
            });
        }

        // Search filter formatted column
        if(searchFormatted.value) {
            filteredLogs = filteredLogs.filter(log => {
                if(log[9].includes(searchFormatted.value)) {
                    return true;
                }
                return false;
            });
        }

        // Render table
        renderTable();
    }
}