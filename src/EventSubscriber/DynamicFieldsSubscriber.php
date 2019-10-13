<?php
/**
 * Ajoute dynamiquement les champs <select> des départements et des villes
 * correspondant à la région sélectionnée.
 *
 *  * Created by PhpStorm.
 * User: armel ( @armel.m )
 * Date: 29/09/19
 * Time: 10:26
 */

namespace App\EventSubscriber;


use App\Entity\Commune;
use App\Entity\Contact;
use App\Entity\Departement;
use App\Entity\Region;
use App\Repository\CommuneRepository;
use App\Repository\DepartementRepository;
use function intval;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;

class DynamicFieldsSubscriber implements EventSubscriberInterface {

    /**
     * DynamicFieldsSubscriber constructor.
     */
    public function __construct() {
    }

    /**
     * Returns an array of event names this subscriber wants to listen to.
     *
     *
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents() {

        return [
            FormEvents::PRE_SUBMIT => 'onPreSubmit', // juste avant la soumission
            FormEvents::POST_SET_DATA => 'onPostSetData', // Edition du form

        ];
    }

    /**
     *  Soumission du formulaire
     *
     * @param FormEvent $event
     */
    public function onPreSubmit(FormEvent $event) {

        $data = $event->getData(); // contact + id région
        $form = $event->getForm();



        //soumission du form,on récupère la région
        if (!empty($data["region"])) {
            $this->addDepartementField($form, $data["region"]);

        }

        if (isset($data["departement"])) {
            $data = $event->getData(); // contact + regionId + departement
            $form = $event->getForm();

            $dep = intval($data["departement"]);
            $this->addCommuneField($form, $dep);

        }

    }


    /**
     * Edition du formulaire
     *
     * @param FormEvent $event
     */
    public function onPostSetData(FormEvent $event) {

        $data = $event->getData(); // contact + id région
        $form = $event->getForm();
        /**
         * @var Contact $contact
         */
        $contact = $event->getData();
        $commune = $contact == null ? null : $contact->getCommune();


        if ($commune) {
            $departement = $commune ? $commune->getDepartement() : null;
            $region = $departement ? $departement->getRegion() : null;

            //sélection du département correspondant au contact
          //  $form->get('departement')->setData($departement);
            $this->addDepartementField($form, $region->getId(), $departement);
            $form->add('commune', EntityType::class, [
                'class' => Commune::class,
                'choices' => $departement->getCommunes(),
            ]);


          //  $form->get('commune')->setData($commune);
            //sélection de la région correspondant au contact
            $form->get('region')->setData($region);


        }

    }

    /**
     * construction du champ département
     *
     * @param FormInterface $form
     * @param Departement|null $departement
     */
    private function addDepartementField(FormInterface $form, ?int $region = null, ?Departement $departement=null) {

        $formOptions = [
            'class' => Departement::class,
            'choice_label' => 'nom',
            'data' => $departement ? $departement:null,
            'mapped' => false,
            'required' => false,
            'placeholder' => '-- Sélectionnez votre département --',

            'query_builder' => function (DepartementRepository $departementRepository) use ($region) {
                return $departementRepository->findByDepBy($region);
            },
        ];

        // if( !$region)

        // create the field, this is similar the $builder->add()
        // field name, field type, field options
        $form->add('departement', EntityType::class, $formOptions);
    }

    /**
     *  ajout du champ select des communes à partir de l'id du département
     *
     * @param FormInterface $form
     * @param int|null $departementId id du département
     */
    private function addCommuneField(FormInterface $form, ?int $departementId) {
        $formOptions = [
            'class' => Commune::class,
            'choice_label' => 'nom',
            'placeholder' => 'form.city',
            'query_builder' => function (CommuneRepository $communeRepository) use ($departementId) {
                // call a method on your repository that returns the query builder
                return $communeRepository->findByCommuneBy($departementId);
            },
        ];


        if ($departementId != null)
            $form->add('commune', EntityType::class, $formOptions);
        else
            $form->add('commune', EntityType::class, [
                'class' => Commune::class,
                'placeholder' => 'form.city',
                'choices' => []
            ]);

    }


}