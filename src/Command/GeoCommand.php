<?php

namespace App\Command;

use App\Services\LoadRegion;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * charge les noms des regions, departements, villes
 * Class GeoCommand
 * @package App\Command
 * useage
 */

class GeoCommand extends Command
{
    protected static $defaultName = 'app:geo';
    /**
     * @var LoadRegion
     */
    private $loadRegion;

    public function __construct(?string $name = null, LoadRegion $loadRegion ) {
        parent::__construct($name);
        $this->loadRegion = $loadRegion;
    }

    protected function configure()
    {
        $this
            ->setDescription('Chargement des données geographiqes')
            ->setHelp($this->getHelp())
            ->setProcessTitle("commende char")
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
            
        ;
    }



    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        $arg1 = $input->getArgument('arg1');
        if($arg1 ==null){
            $io->title("Les commandes suivantes permettent de charger les régions, les départartements et les villes:");
            $io->text('<info>php bin/console app:geo region</info>');
            $io->text('<info>php bin/console app:geo departement</info>');
            $io->text('<info>php bin/console app:geo ville</info>');

        }


        if ($arg1 =="region") {
          //  $io->note(sprintf('You passed an argument: %s', $arg1));
            $this->loadRegion->saveRegions();
            $io->success('Commande sauvergarde régions effectuée avec succès');

        }
        if ($arg1 =="departement") {
            $io->note(sprintf('You passed an argument: %s', $arg1));
            $this->loadRegion->saveDepartements();
            $io->success('Commande sauvergarde départements effectuée avec succès');
        }
        if ($arg1 =="ville") {
            $io->note(sprintf('You passed an argument: %s', $arg1));
            //$io->note(sprintf('You passed an argument: %s', $arg1));
            $this->loadRegion->saveCommunes();
            $io->success('Commande sauvergarde communes effectuée avec succès');

        }
       // echo "======== commande appelée ======\n";

        if ($input->getOption('option1')) {
            // ...
        }

//        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');
    }


    /**
     * The command help is usually included in the configure() method, but when
     * it's too long, it's better to define a separate method to maintain the
     * code readability.
     */
    private function getCommandHelp(): string
    {
        return <<<'HELP'
The <info>%command.name%</info> command de créations des données géographiques & chargemment dans la base:

  <info>php %command.ville%</info> <comment> save ville</comment>

HELP;
    }
    
}

