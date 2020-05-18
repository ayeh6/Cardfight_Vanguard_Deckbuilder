<?php
function get_data() {
    $connect = mysqli_connect("localhost","root","","vanguard_test");
    $query = "SELECT * FROM cards";
    $result = mysqli_query($connect,$query);
    $card_data = array();
    while($row = mysqli_fetch_array($result)) {
        $card_data[] = array(
            'ID' => $row["ID"],
            'Name' => $row["Name"],
            'Type' => $row["Type"],
            'Clan' => $row["Clan"],
            'Race' => $row["Race"],
            'Nation' => $row["Nation"],
            'Grade' => $row["Grade"],
            'Power' => $row["Power"],
            'Critical' => $row["Critical"],
            'Shield' => $row["Shield"],
            'Skill' => $row["Skill"],
            'Effect' => $row["Effect"],
            'Flavor' => $row["Flavor"],
            'Rarity' => $row["Rarity"],
            'Image' => $row["Image"]
        );
    }
    return json_encode($card_data);
}
$file_name = "cards". ".json";  
if(file_put_contents($file_name, get_data()))  
{  
     echo $file_name . ' File created';  
}  
else  
{  
     echo 'There is some error';  
}  

?>
