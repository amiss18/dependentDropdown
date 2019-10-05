import Routing from './routes'


(function () {


    let $region = $('#contact_region');
    let $departement = $('#contact_departement');
    let $commune = $('#contact_commune');

    //chargement de la liste des départements
    let $response = ( data, $select ) => {
        $.each(data, function(optVal, text) {
            $select.prepend(`<option value='${text["id"]}' >${text["nom"]}</option>`);
        });
    }



//recherche des communes correspondant au département sélectionné
    $(document).on('change', ' #contact_departement', function () {
        let $field = $(this)
        let value=$field.val()
        $commune.empty()

        $.ajax({
          //  url: `http://127.0.0.1:8000/communes/${value}`,

            url:  Routing.generate('villes_d_un_departement',{ departement: value }),
            type: 'GET',
            success: function (data) {
                if(data.length ==0 ) alert("Il n'existe aucune ville pour ce département")
                console.log(data)

                //ajout des communes rétournées par AJAX dans la liste déroulante des communes
                $response( data, $commune )
            }
        });
    });

})()