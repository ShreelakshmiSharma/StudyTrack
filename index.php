<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyTrack Login</title>
    <style>
        body {
            background: #eee;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        #studyTrackAnimation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            color: #333;
            animation: fadeInOut 3s ease-out forwards;
            opacity: 0;
        }
        @keyframes fadeInOut {
            0% { opacity: 0; }
            25% { opacity: 1; }
            75% { opacity: 1; }
            100% { opacity: 0; }
        }
  
        #frm{  
            border: solid gray 1px;  
            width:25%;  
            border-radius: 2px;  
            margin: 120px auto;  
            background: white;  
            padding: 50px;  
        }  
        #btn{  
            color: #fff;  
            background: #337ab7;  
            padding: 7px;  
            margin-left: 40%;  
        }  

    </style>
</head>
<body>
    <div id="studyTrackAnimation">StudyTrack</div>

    <div id="frm" style="display:none;">
        <h1>Login</h1>
        <form name="f1" action="authen.php" onsubmit="return validation()" method="POST">
            <p>
                <label> UserName: </label>
                <input type="text" id="user" name="user" />
            </p>
            <p>
                <label> Password: </label>
                <input type="password" id="pass" name="pass" />
            </p>
            <p>
                <input type="submit" id="btn" value="Login" />
            </p>
            <p>
            <input type="button" id="btn" value="Register" onclick="openRegister()" />
        </p>
        </form>

    </div>

    <script>
        setTimeout(function() {
            document.getElementById("studyTrackAnimation").style.display = "none";
            document.getElementById("frm").style.display = "block";
        }, 3000);

        function openRegister() {
            window.location.href = "register_file.php";
        }

        function validation() {
            var id = document.f1.user.value;
            var ps = document.f1.pass.value;
            if (id.length == "" && ps.length == "") {
                alert("User Name and Password fields are empty");
                return false;
            } else {
                if (id.length == "") {
                    alert("User Name is empty");
                    return false;
                }
                if (ps.length == "") {
                    alert("Password field is empty");
                    return false;
                }
            }
        }
    </script>
</body>
</html>
