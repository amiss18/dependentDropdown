<?php
/**
 *  * Created by PhpStorm.
 * User: armel ( @armel.m )
 * Date: 27/09/19
 * Time: 12:04
 */

namespace App\Services;


use App\Entity\Commune;
use App\Entity\Departement;
use App\Entity\Region;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use function file_get_contents;
use function json_decode;

/**
 *  Récupère les donnés géographiques depuis 'geo.api.gouv.fr'
 * pour les insérer dans les tables(commune, département, région) de la base de données
 *
 * Class LoadRegion
 * @package App\Services
 */
class LoadRegion {

    const URL_REGION="https://geo.api.gouv.fr/regions";
    //http https://geo.api.gouv.fr/departements?codeRegion=53
    const URL_DEPARTEMENT="https://geo.api.gouv.fr/departements?codeRegion=";

    //http https://geo.api.gouv.fr/departements/35/communes?limit=4
    const LIMIT_POP = 30000; // on ne souhaite récuperer que les communes de plus de 30 mille habitants


    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager )  {
        $this->entityManager = $entityManager;
    }

    /**
     * @return EntityManagerInterface
     */
    public function saveRegions():void {
        echo "chargement des regions \n";
        //récuperation des regions depuis l'API exposée
        $regions = json_decode( file_get_contents(static::URL_REGION), true );


        /**
         * parcours des régions de l'API et pour chaque région réuperée
         * on la sauvergarde dans la BD
         */
        foreach ( $regions as $v ){
            $entity = new Region();
            $entity->setCode($v["code"]) ;
            $entity->setNom($v["nom"]) ;
            $this->entityManager->persist($entity);
            echo "(REG) code ={$v['code']},  nom : {$v['nom']} \n";
        }
        $this->entityManager->flush();

    }

    /**
     * Récuperation & sauvergarde des département par région
     */
    public function saveDepartements():void {
        echo "chargement des départements\n";
        /**
         * @var Collection
         * Pour chaque région récuperée dans la base,
         * on demande à l'API de renvoyer les démandes correspondant à cette région
         */
        $regions = $this->entityManager->getRepository(Region::class)->findAll();
        foreach ( $regions as $region) {
            $departements = json_decode(
                file_get_contents(static::URL_DEPARTEMENT.$region->getCode()),
                true );

            // départements de l'API
            foreach ( $departements as $v ){
                $entity = new Departement();

                $entity->setCode($v["code"])
                  ->setNom($v["nom"])
                  ->setRegion($region)
                  ->setCodeRegion($v["codeRegion"]);
                 $this->entityManager->persist($entity);
                echo "(DEP)code ={$v['code']},  nom : {$v['nom']} \n";
            }
            $this->entityManager->flush();

        }


    }


    /**
     *  Récuperation & sauvergarde des villes
     */
    public function saveCommunes():void {
        echo "chargement des villes \n";
        /**
         * @var Collection
         */
        $departements = $this->entityManager->getRepository(Departement::class)->findAll();
        foreach ( $departements as $departement) {
            //communes correspondant au département $departement
            $urlCommune = "https://geo.api.gouv.fr/departements/{$departement->getCode()}/communes?fields=centre,codeRegion,codesPostaux,codeDepartement,population&boost=population";
            $villes = json_decode( file_get_contents( $urlCommune), true );

            echo " \n ==== DEP: {$departement} ======\n";

            foreach ( $villes as $v ) {
                if (isset($v["population"]) && $v["population"] >= self::LIMIT_POP) {

                $entity = new Commune();
                $lon = $v['centre']['coordinates'][0]; //longitude
                $lat = $v['centre']['coordinates'][1]; //latitude
                $entity->setNom($v["nom"])
                    ->setCodeDepartement($v["codeDepartement"])
                    ->setCodeRegion($v["codeRegion"])
                    ->setCodesPostaux($v["codesPostaux"])
                    ->setDepartement($departement)
                    ->setLat($lat)
                    ->setLon($lon)
                    ->setPopulation($v["population"]);


                $this->entityManager->persist($entity);

                echo "(VILLE)code ={$v['code']},  nom : {$v['nom']}, pop={$v['population']}, long=$lon, lat=$lat \n";
            }
            }


        }

        $this->entityManager->flush();
    }

}


/*
 * "coordinates": [
        -1.5924, //lon
        48.1223  // lat
      ]
 */