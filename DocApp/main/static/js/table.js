getPeopleInfo();

function getPeopleInfo(){
    var data = $.ajax( {
        type: 'GET',     
        url: 'https://api.covid19india.org/data.json',
        data: {},
        success: function(data) {
            var obj = JSON.parse;
            var x = data.statewise;
            // console.log(data);
            console.log(x);
            $("#cases_data").text(x[0].active);
            $("#death_data").text(x[0].deaths);
            $("#rec_data").text(x[0].recovered);

            // ====================================================================================

            $.fn.dataTable.ext.errMode = 'none';
            $('#example').DataTable( {
                "lengthMenu": [[-1], ["All"]],
                data: x,
                columns: [
                    {data: 'state' },
                    {data: 'active' },
                    {data: 'confirmed'},
                    {data: 'recovered'},
                    {data: 'deaths' },
                ]
            } );

            // ==============================================================
        }


    });
    return data;
}