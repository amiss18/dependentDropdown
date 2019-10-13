<?php

namespace App\Controller;

use App\Entity\Commune;
use App\Form\CommuneType;
use App\Repository\CommuneRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/commune")
 */
class CommuneController extends AbstractController
{
    /**
     * @Route("/", name="commune_index", methods={"GET"})
     */
    public function index(CommuneRepository $communeRepository): Response
    {
        return $this->render('commune/index.html.twig', [
            'communes' => $communeRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="commune_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $commune = new Commune();
        $form = $this->createForm(CommuneType::class, $commune);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($commune);
            $entityManager->flush();

            return $this->redirectToRoute('commune_index');
        }

        return $this->render('commune/new.html.twig', [
            'commune' => $commune,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="commune_show", methods={"GET"})
     */
    public function show(Commune $commune): Response
    {
        return $this->render('commune/show.html.twig', [
            'commune' => $commune,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="commune_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Commune $commune): Response
    {
        $form = $this->createForm(CommuneType::class, $commune);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('commune_index');
        }

        return $this->render('commune/edit.html.twig', [
            'commune' => $commune,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="commune_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Commune $commune): Response
    {
        if ($this->isCsrfTokenValid('delete'.$commune->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($commune);
            $entityManager->flush();
        }

        return $this->redirectToRoute('commune_index');
    }


    /**
     * Liste les villes à partir de l'id du département
     *
     * @Route("/departement/{departement}",  options={"expose"=true}, name="villes_d_un_departement")
     */
    public function villesParDepartement( int $departement, CommuneRepository $communeRepository ) {
        $villes = $communeRepository->findByCommuneBy($departement)->getQuery()->getArrayResult();
        // dd($villes);
        return $this->json($villes);
    }
}
