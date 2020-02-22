<?php

namespace Drupal\boi_ccg\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class CountryCrieteriaGraphController.
 */
class CountryCrieteriaGraphController extends ControllerBase {

    /**
   * Benchmark.
   *
   * @return string
   *   Return Hello string.
   */
    public function benchmark() {
        //load country data
        $vid = 'country';
        $terms =\Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);
        $loaded_terms = [];
        $criteria_country = [];
        //        kint($terms);
        //        exit;
        foreach ($terms as $term) {
            $loaded_term = [];
            $country_id = $term->tid;
            $country_name = $term->name;
            $country_term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($country_id);

            $loaded_term['name'] = $country_name; 
            $loaded_term['tid'] = $country_id; 

            foreach($country_term->get('field_criteria_value') as $field)
            {
                $field_value = $field->getValue()['value'];
                $field_collection = \Drupal\field_collection\Entity\FieldCollectionItem::load($field_value);


                $value = $field_collection->get('field_value')->getValue()[0]['value'];
                $criteria_id = $field_collection->get('field_criterias')->getValue()[0]['target_id'];
                $loaded_term['criterias_values'][$criteria_id] = [
                    'criteria_id' =>$criteria_id,
                    'value' => $value
                ];

                $criteria_country[$criteria_id][] = $country_id;
            }

            $loaded_terms[$country_id] = $loaded_term;
        }


        //load top criteria parent
        $criteria_parent = [];

        $vid = 'criteria_top_level';
        $terms =\Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);
        foreach($terms as $term)
        {
            $criteria_parent[$term->tid] = [
                'tid'  => $term->tid,
                'name' => $term->name,
                'criterias' => [],
            ];
        }



        //load criteria
        $criterias = [];
        $vid = 'criteria';
        $terms =\Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);

        foreach($terms as $term)
        {
            $criteria_term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($term->tid);
            $parent_id = $criteria_term->get('field_parent')[0]->getValue()['target_id'];

            $criterias[$term->tid] = [
                'tid'  => $term->tid,
                'name' => $term->name,
                'countries' => isset($criteria_country[$term->tid])?$criteria_country[$term->tid]:[],
                'parent_id' => $parent_id,
            ];

            $criteria_parent[$parent_id]['criterias'][$term->tid] = $criterias[$term->tid];
        }

        $all_data  = [
            'countries' => $loaded_terms,
            'criterias' => $criterias,
            'criteria_parent' => $criteria_parent
        ];




        $output = [];


        $checkboxes_output = '<div class="row">';
        $checkboxes_output .= '<div class="col-md-12 col-sm-12 top-title"><p>Search, analyze, and compare Pakistan in different aspects by using user-friendly charts.</p></div>';

        $checkboxes_output .= '<div class="col-md-3 col-sm-6 col-xs-12 criteria select-all-parent">
        <h3>1- Criteria</h3>
        <div class="select-all">
        <label class="criteria-input">Select All<input type="checkbox" class="select-all"></label>
        <div class="criterias-wrapper">
        ';

        foreach($criteria_parent as $cp){
            $checkboxes_output .= "<div>
            <h4>".$cp['name'].'</h4>
            <div class="criterias-wrapper-sub">
            ';
            if(count($cp['criterias']) > 0){
                foreach($cp['criterias'] as $criteria)
                {
                    $checkboxes_output .= '<div><label>
            '.$criteria['name'].': 
            <input data-name="'.$criteria['name'].'" class="criteria-checkbox" type="checkbox" data-group="criteria" value="'.$criteria['tid'].'" />
            </label></div>';
                }
            }else{
                $checkboxes_output .= "<div>No Criteria.</div>";
            }
            $checkboxes_output .= "</div></div>";
        }

        $checkboxes_output .= '</div></div></div>';


        $checkboxes_output .= '<div class="col-md-3 col-sm-6 col-xs-12 country select-all-parent">
                <h4>2- Countries</h4>
                <div class="select-all">
                <label class="countries-input">Select All<input type="checkbox" class="select-all"></label>
                <div class="countries-wrapper">
        ';
        foreach($loaded_terms as $country)
        {
            $checkboxes_output .= '<div ><label style="display:none;">
            '.$country['name'].': 
            <input data-name="'.$country['name'].'"  class="country-checkbox" type="checkbox" data-group="criteria" value="'.$country['tid'].'" />
            </label></div>';
        }

        $checkboxes_output .= '</div></div></div>';

        $checkboxes_output .= '<div class="col-md-6 col-sm-12 col-xs-12 chart">
        <h3>3- Chart</h3>
        <div class="chart-type-select-wrapper"> 
        ';

        $checkboxes_output .= '<select id="char-type-select"> 
        <option value="bar">Bar Charts</option>
        <option value="line">Line</option>
        <option value="pie">Pie</option>
        </select>
        ';
        $checkboxes_output .= '<div id="chart_div"></div>';
        $checkboxes_output .= '</div></div>';//</.char-type-select-wrapper></.col-sm-*>


        $checkboxes_output .= '</div>';//endof .row


        $output['criterias_checkboxes'] = [
            '#type' => 'inline_template',
            '#template' => $checkboxes_output,
            '#context' => [
                'somecontent' => $checkboxes_output
            ]
        ];

        $output['page_element'] = [
            '#markup' => '<div id="graph-page-output"></div>'
        ];

        $output[] = [
            '#theme' => 'boi_ccg',
            '#data' => 'var boi_graph_data = '.json_encode($all_data).';',
        ];

        $output[] = [
            '#markup' => '<div></div>',
            '#attached' => array(
                'library' =>  array(
                    'boi_ccg/boi.ccg' 
                ),
            ),
        ];

        return $output;
    }

}
