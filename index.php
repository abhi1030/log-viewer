<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log viewer</title>
    <link rel="shortcut icon" href="./favicon.png" type="image/png">  
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <header>
        <h1 class="app-title">Log viewer</h1>
    </header>
    <div class="body-content">
        <div class="log-action-container">
            <label for="log-file" class="log-file-label" id="log-file-label">Select Log File</label>
            <input type="file" class="log-file-input" name="log-file" id="log-file">
            <button class="reset-btn" id="reset-btn" disabled>Reset Logs</button>
            <div class="log-pagination">
                <button class="prev-log" id="prev-log" disabled>Prev</button>
                <input type="number" class="log-page" name="log-page" id="log-page"min="1" value="1" disabled>
                <button class="next-log" id="next-log" disabled>Next</button>
            </div>
            <div class="log-info">
                <span class="log-pages" id="log-pages">Pages : <i></i></span>
                <span class="log-count" id="log-count">Logs : <i></i></span>
            </div>            
        </div>
    
        <table class="log-table">
            <thead>
                <tr>
                    <th><input type="text" name="search-message" id="search-message" placeholder="Search in message..." disabled></th>
                    <th><input type="text" name="search-context" id="search-context" placeholder="Search in context..." disabled></th>
                    <th><input type="text" name="search-level" id="search-level" placeholder="Search in level..." disabled></th>
                    <th><input type="text" name="search-level_name" id="search-level_name" placeholder="Search in level name..." disabled></th>
                    <th><input type="text" name="search-channel" id="search-channel" placeholder="Search in channel..." disabled></th>
                    <th><input type="text" name="search-record_datetime" id="search-record_datetime" placeholder="Search datetime..." disabled></th>
                    <th><input type="text" name="search-remote_addr" id="search-remote_addr" placeholder="Search in remote address..." disabled></th>
                    <th><input type="text" name="search-user_agent" id="search-user_agent" placeholder="Search in user agent..." disabled></th>
                    <th><input type="text" name="search-created_at" id="search-created_at" placeholder="Search in created_at..." disabled></th>
                    <th><input type="text" name="search-formatted" id="search-formatted" placeholder="Search in formatted data..." disabled></th>
                </tr>
                <tr>
                    <th>Message</th>
                    <th>Context</th>
                    <th>Level</th>
                    <th>Level Name</th>
                    <th>Channel</th>
                    <th>Record DateTime</th>
                    <th>Remote Address</th>
                    <th>User Agent</th>
                    <th>Created At</th>
                    <th>Formatted</th>
                </tr>
            </thead>
            <tbody id="logs"></tbody>
            <tfoot></tfoot>
        </table>
    </div>
    <footer>
        <p class="copyright">Created by Abhishek.</i></p>
    </footer>
    <script src="./script.js"></script>
</body>
</html>