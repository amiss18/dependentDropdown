<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 *  Gère le changement de la langue
 *
 * Class LocaleController
 * @package App\Controller
 */

class LocaleController extends AbstractController {



    /**
     * changement de la langue
     *
     * @Route("/loc/{_locale}", methods={"GET"}, name="change_locale")
     *
     */
    public function changeLanguage(Request $request) {

        $referer = $request->server->get('HTTP_REFERER');
        dump($request->getRequestUri());

        if ($referer)
            return $this->redirect($referer);
        return $this->redirectToRoute('contact_index', []);
    }
}
