import Routing from './routes'


$(function () {

    let $region = $('#contact_region');
    let $departement = $('#contact_departement');
    let $commune = $('#contact_commune');


    //peuplement des champs select (region, département)
    let $response = (data, $select) => {

        $.each(data, function (optVal, text) {
            let o = new Option(text.nom, text.id);
            // o.selected=true;
            $($select).append(o);

        });
    }

    //lorsqu'une région est sélectionnée par défaut(ex refresh de la page), on réaffiche ses départements
    if ($region.val()) {
        const value = $region.val()


        let departement_route = Routing.generate("departements_d_une_region", {region: value});


        // $.get(`http://127.0.0.1:8000/departements/${value}`).then( (data)=>{
        $.get(departement_route).then((data) => {

            // $departement.empty()
            $response(data, $departement)
        })



    }


    $(document).on('change', ' #contact_region', function () {

        let $field = $(this)
        $commune.empty()
        // $departement.empty()

        const value = $region.val()


        let $regionField = $('#contact_region')
        let $form = $field.closest('form')

        let departement_route = Routing.generate("departements_d_une_region", {region: value});


        // $.get(`http://127.0.0.1:8000/departements/${value}`).then( (data)=>{
        $.get(departement_route).then((data) => {

            console.log("region select =" + $departement.val())
            $departement.empty()
            $departement.append(new Option("Sélectionnez votre département", ""));


            $response(data, $departement);


            console.log(data)
        })


    });




})