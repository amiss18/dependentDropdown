import Routing from './routes'


$(function () {

    let $region = $('#contact_region');
    let $departement = $('#contact_departement');
    let $commune = $('#contact_commune');


    //peuplement des champs select (region, département)
    let $response = (data, $select) => {
        $.each(data, function (optVal, text) {
            $select.prepend(`<option value='${text["id"]}' >${text["nom"]}</option>`);
        });
    }

    //lorsqu'une région est sélectionnée par défaut(ex refresh de la page), on réaffiche ses départements
    if ($region.val()) {
        const value = $region.val()

        let departement_route = Routing.generate("departements_d_une_region", {region: value});

        // $.get(`http://127.0.0.1:8000/departements/${value}`).then( (data)=>{
        $.get(departement_route).then((data) => {
            $response(data, $departement)
        })

    }


    // $region .change(function() {
    $(document).on('change', ' #contact_region', function () {

        let $field = $(this)
        $commune.empty()
        $departement.empty()


        //  console.log("dep select")
        let $regionField = $('#contact_region')
        let $form = $field.closest('form')

        // Données à envoyer via Ajax
        let data = {}
        data[$region.attr('name')] = $region.val();
        data[$departement.attr('name')] = $departement.val();
        // soummission du form avec POST et envoie de la région en AJAX
        $.post($form.attr('action'), data).then(function (data) {


            //on récupère le champ select retourné dans la réponse AJAX
            let $newSelect = $(data).find('#contact_departement')

            //on remplace le champ select du département par le nouveau champ renvoyé par AJAX
            $('#contact_departement').replaceWith($newSelect)


        })
    });

})