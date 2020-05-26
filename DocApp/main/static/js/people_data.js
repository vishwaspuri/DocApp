   

getPeopleInfo();
// add a dashboard column to the complete data set

function getPeopleInfo(){
    var data = $.ajax( {
        type: 'GET',     
        url: 'https://covihack.pythonanywhere.com/api/profiles/',
        data: {},
        success: function(data) {
            var obj = JSON.parse;
            var x = data;
            console.log(data);
            // add dashboard text in each row

            for( i = 0; i<x.length; i++){
                x[i].dashboard = 'view profile'
            }

            console.log(x);
            // ====================================================================================

              $.fn.dataTable.ext.errMode = 'none';
            var table = $('#example').DataTable( {
                data: data,
                columns: [
                    { data: 'Mobile' },
                    {data: 'Probability'},
                    { data: 'ID' },
                    { 
                         "data": "dashboard",
                         "render": function(data, type, row, meta){
                            if(type === 'display'){

                                data = '<a href="{% url general_public %}" onclick='+store_it()+'>' + data + '</a>';
                            }

                            return data;
                         }
                      }
                ]
            } );

            $('#example tbody').on( 'click', 'tr', function () {
                   if ( $(this).hasClass('selected') ) {
                       $(this).removeClass('selected');
                   } else {
                       table.$('tr.selected').removeClass('selected');
                       $(this).addClass('selected');
                       
                       var data = $('#example').DataTable().row('.selected').data();
                       console.log(data);
                       localStorage.setItem("storageName",data.Mobile);
                       // alert("Name:" + data.Mobile + "\nJob:" + data[1]);
                   }
               });

            // ==============================================================
        }


    });
    return data;
}

function store_it(){
//just get the respective value and then you're done
    var feed
    if ( $(this).hasClass('Mobile') ) {
        feed = 1
    }

    localStorage.setItem("storageName",'+917083201514');
}