<?php

namespace App\DataFixtures;

use App\Entity\Commune;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Contact;
use Faker\Factory as Faker;
use function rand;

class AppFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        // $product = new Product();

        $villes=[ "Paris", "Lille", "Lyon",  "Rennes", "Nice", "Bordeaux", "Toulouse"];


        $faker = Faker::create('fr_FR');
        for( $i=0; $i<10; $i++ ){
            //tirage aléatoire d'une ville du tableau $villes
            $ville = $villes[ rand(0, count($villes)-1)];
            $commune = $manager->getRepository(Commune::class)->findOneBy(["nom" =>$ville ]);

            echo "co=$commune,";

            $contact = new Contact();
            $contact->setNom( $faker->name)
                ->setTel($faker->phoneNumber)
                ->setCommune($commune);
            $manager->persist($contact);
        }

        $manager->flush();
    }
}
