<?php

namespace App\Form;

use App\Entity\{
    Commune, Contact, Departement, Region
};
use App\EventSubscriber\DynamicFieldsSubscriber;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * formulaire de création d'un contact
 *
 * Class ContactType
 * @package App\Form
 */
class ContactType extends AbstractType {

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('nom', TextType::class,[
                'label' => 'title.fullname'
            ])
            ->add('tel',TextType::class,[
                'label' => 'title.phone'
            ])
            ->add('region', EntityType::class, [
                'mapped' => false,
                'class' => Region::class,
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('r')
                        ->orderBy('r.nom', 'ASC');
                },
                'placeholder' => 'form.country',
                'label' => 'title.country'

            ])
            ->add('departement', EntityType::class, [
                'class' => Departement::class,
                'choices' => [],
                'mapped' => false,
                'required' => false,
                'placeholder' => 'form.department',
                'label' => 'title.department'
            ])
            ->add('commune', EntityType::class, [
                'class' => Commune::class,
                'choices' => [],
                'mapped' => false,
                'required' => false,
                'placeholder' => 'form.city',
                'label' => 'title.city'
            ]);

        $builder->addEventSubscriber(new DynamicFieldsSubscriber());


    }


    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }


}
