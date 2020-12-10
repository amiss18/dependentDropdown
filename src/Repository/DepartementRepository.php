<?php

namespace App\Repository;

use App\Entity\Commune;
use App\Entity\Departement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
//use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\Persistence\ManagerRegistry;
/**
 * @method Departement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Departement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Departement[]    findAll()
 * @method Departement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DepartementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Departement::class);
    }


//createDepQueryBuilder

    public function findByDepBy( int $region ) {
        return $this->createQueryBuilder('d')
            ->join("d.region", "r")
            ->andWhere('r.id = :region')
            ->setParameter('region', $region)
            ->orderBy('d.nom', 'ASC');
           // ->setMaxResults(10)
           // ->getQuery();
          //  ->getResult();
       }
    // /**
    //  * @return Departement[] Returns an array of Departement objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Departement
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
